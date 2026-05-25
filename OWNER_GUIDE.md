# Your Website — How to Update It Yourself

Hi! This is your simple guide. You don't need any coding skills. Almost everything you'll ever want to change lives in **one Google Sheet**.

---

## 1. Where to find your stuff

You'll have **3 things** after setup. Bookmark all three.

| What | Where | What it does |
|---|---|---|
| **Your website** | https://yourdomain.com | What customers see |
| **Your content sheet** | (your unique Google Sheet link — bookmark this!) | Where you edit prices, add-ons, and photo captions |
| **Your email** | The email address you signed up with | Where customer inquiries arrive |

---

## 2. Change a price

1. Open your **Google Sheet** (bookmark above).
2. Click the tab at the bottom called **Packages**.
3. Find the row for the package you want to change.
4. Click the cell under the **price** column and type the new price (e.g. `$175`).
5. Done — just close the tab. The website updates in about a minute. Refresh your website to confirm.

You can edit:
- The price
- The package name
- The "For X guests" line
- The description
- The list of features (separate each feature with the pipe character `|`)
- The icon (any single emoji)
- Which package is featured ("Most Popular" ribbon) — set the `featured` column to `yes` for one row, `no` for the others.

---

## 3. Change an add-on (the "Everything You Need" section)

Open the sheet → click the **Addons** tab → edit any row.

- To **add a new add-on**: type it into the next empty row. It will also automatically appear as a checkbox on your inquiry form.
- To **remove one**: delete the entire row.
- To **change the price**: just type the new price in that row.

Tags (the little chips under each add-on) are separated by `|`. So `Fresh Florals|Seasonal` becomes two tags.

---

## 4. Change your portfolio photos

You have two options.

### Easy: send us the photos
Email or text us your new photos and we'll drop them in. Free, takes a minute.

### Self-serve: do it yourself in the sheet
1. Upload the photo somewhere public (Imgur is free and easy — go to imgur.com, drag your photo, copy the direct image URL).
2. Open the sheet → **Portfolio** tab.
3. Paste the URL into the **image_url** column for any row.
4. Edit the caption in the **caption** column if you want.

Recommended sizes are in the [/images/portfolio/README.txt](images/portfolio/README.txt) file (your developer can show you).

---

## 5. Read customer inquiries

When someone fills out the form on your website, you get an email at the address you signed up with on web3forms.com.

The email shows you:
- Their name, email, phone
- Preferred date and number of guests
- Which package they're interested in
- Which add-ons they want (every checked box)
- Their message

**Just hit Reply** from your normal email to respond — it goes straight to the customer.

---

## 6. Common questions

**Q. I edited the sheet but nothing changed on the site.**
Wait ~1 minute, then do a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac). The sheet has a small cache so changes take up to a minute to appear.

**Q. I'm worried I'll break something.**
You won't. If the sheet ever gets messed up, the website automatically falls back to the original prices and add-ons that were set up at launch. Your site never "breaks" because of a sheet edit. (And we can always restore the sheet from the backup in [content.json](content.json).)

**Q. I want to change something that isn't in the sheet (like the hero headline or my phone number).**
Text us. Those are baked into the website code and only take a minute to update.

**Q. I'm not receiving inquiry emails.**
Check your spam folder once. If they're not there, log into web3forms.com and verify your email address is still confirmed.

---

## 7. Emergency contacts

- **Site looks broken:** text us
- **Customer can't submit the form:** text us
- **You forgot your sheet link:** text us — we have it backed up

That's it. You're in control. ♥
