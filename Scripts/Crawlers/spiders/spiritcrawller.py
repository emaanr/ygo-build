"""
Script for crawling pack lists from Yu-Gi-Oh! GX: Spirit Caller.
Hence why I named the script "spiritcrawller"...

Anyway, right now the script only works on the "...Card_Pack_List" link as seen below.
I'm not sure if the "Starter Deck" cards are fully covered in all the game's card packs but for now I've excluded it.
Will likely have to modify this script in the future to support crawling other card lists from the game.
"""

import json
import scrapy
from pathlib import Path
from collections import defaultdict

class SpiritCrawller(scrapy.Spider):
    name = "spiritcrawller" # scrapy crawl spiritcrawller -a packs="Legend of the White Dragon, Established Chaos"
    base_url = "https://yugioh.fandom.com"
    start_urls = [f"{base_url}/wiki/Yu-Gi-Oh!_GX_Spirit_Caller_Card_Pack_List"]

    PACKS = { # Pre-defined set of expected packs from the game
        "Legend of the White Dragon",
        "Powerful Seal", 
        "Established Chaos",
        "Shadow Magicians",
        "Scarlet Firestorm",
        "Summoning Thunder",
        "Ultimate Power",
        "Requirements of a Hero",
        "Confusion Envoy",
        "Toon Revenge",
        "Machines Unleashed",
        "Reboot Electronics",
        "Eternal Mentor",
        "Thirst for Victory",
        "Ominous Fiends",
        "War Against Dragons",
        "Gravekeeper's Destiny",
        "Union Strength",
        "Sword and Sorcery Combo",
        "Messenger from the Sky",
        "Temple of the King",
        "Destroyer from Light",
        "Wrath of Evil",
        "Destruction and Rebirth",
        "Light into Darkness",
        "Deep Shadows"
    }

    def __init__(self, packs: str = None, *args: any, **kwargs: any):
        super(SpiritCrawller, self).__init__(*args, **kwargs)
        
        self.results = defaultdict(list)

        if not packs:
            raise ValueError(
                "The 'packs' parameter is REQUIRED: Use 'All' for all packs or specify comma-separated list of pack names."
            )

        if packs == "All":
            self.packs = self.PACKS
            self.logger.info(f"Targetting all available packs")
        else:
            packs = [pack.strip() for pack in packs.split(',')]
            invalid = [pack for pack in packs if pack not in self.PACKS]
            if invalid:
                raise ValueError(f"Invalid Packs: {invalid}")
            self.packs = packs
            self.logger.info(f"Targetting {self.packs} packs")

        self.setup_output_dir()

    def setup_output_dir(self):
        spider_dir = Path(__file__).parent
        project_root = spider_dir.parent.parent
        self.output_dir = project_root / "ETL" / "data"
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.logger.info(f"Output Directory Set To: {self.output_dir}")

    def helper(self, response, callback, meta=None, filter=True):
        links = response.xpath('//div[contains(@class, "mw-content-ltr")]/ul/li/a')
        
        link_data = []
        for link in links:
            link_text = link.xpath('./text()').get().strip()
            link_href = link.xpath('./@href').get().strip()
            link_data.append({'text': link_text, 'href': link_href})
        
        links_to_follow = (
            [link for link in link_data if link['text'] in self.packs] 
            if filter 
            else link_data
        )
        
        for link in links_to_follow:
            request_meta = meta.copy() if meta else {}
            if filter: # Only set pack_name if we're filtering (dealing with packs)
                request_meta['pack_name'] = link['text']
                
            url = f"{self.base_url}{link['href']}"
            action = "Following Pack" if filter else "Following Card"
            self.logger.info(f"{action}: {link['text']}")
            
            yield response.follow(
                url,
                callback=callback,
                meta=request_meta
            )

    def parse(self, response):
        yield from self.helper(
            response=response,
            callback=self.parse_pack,
        )

    def parse_pack(self, response):
        yield from self.helper(
            response=response,
            callback=self.parse_card,
            meta={'pack_name': response.meta['pack_name']},
            filter=False
        )

    def parse_card(self, response):
        self.results[response.meta['pack_name']].append(
            ''.join(
                response.xpath(
                    '//tr[@class="cardtablerow"]'
                    '[th/a[@title="Passcode"]]'
                    '/td//text()'
                ).getall()
            ).strip()
        )

    def closed(self, reason):
        output_file = self.output_dir / "crawl.json"
        with open(output_file, "w") as f:
            json.dump(self.results, f, indent=2)
        self.logger.info(f"Spider closed ({reason}). Saved Results: {output_file}")