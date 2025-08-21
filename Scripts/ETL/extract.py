import json
import time
import requests

INPUT_FILE = "data/crawl.json"
OUTPUT_FILE = "data/extract.json"
API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php"

def get_cardinfo(passcode):
    response = requests.get(f"{API_URL}?id={passcode}")
    response.raise_for_status()
    return response.json()

def main():
    with open(INPUT_FILE, "r") as f:
        packs = json.load(f)
    
    output_data = {}
    
    for pack, passcodes in packs.items():
        output_data[pack] = []
        for passcode in passcodes:
            cardinfo = get_cardinfo(passcode)
            time.sleep(0.05) # Rate limiting to avoid exceeding 20 requests per second
            print(cardinfo)
            output_data[pack].append(cardinfo)
    
    with open(OUTPUT_FILE, "w") as f:
        json.dump(output_data, f, indent=2)

if __name__ == "__main__":
    main()