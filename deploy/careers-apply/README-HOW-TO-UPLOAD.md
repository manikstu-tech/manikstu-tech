# Careers Apply fix — upload guide (सरल भाषा में)

Screenshot वाली गलती `The route api/careers/2/apply could not be found` इसलिए आ रही थी
क्योंकि server पर CV लेने वाला route बना ही नहीं था. Form सही था, server अधूरा था.

## Upload (5 मिनट, File Manager से)

Hostinger hPanel → Websites → manikstu.com → File Manager →
`~/domains/manikstu.com/public_html/api` (वही folder जो `api.manikstu.com` चलाता है):

| ये file (इस folder से) | Server पर कहाँ रखें |
|---|---|
| `2026_10_10_000000_create_job_applications_table.php` | `database/migrations/` में |
| `JobApplication.php` | `app/Models/` में |
| `CareerApplicationController.php` | `app/Http/Controllers/Api/` में |
| `AdminApplicationController.php` | `app/Http/Controllers/Admin/` में → नाम बदलकर `ApplicationController.php` रखें |
| `routes-snippet.php` | खुद मत upload करो — इसे खोलकर 4 लाइनें `routes/api.php` में copy-paste करो (file में लिखा है कहाँ) |

⚠️ गलत folder में मत डालना: `~/public_html/api` (पुराना, टूटा `.env` वाला) और
`~/public_html/api_old_*` (बकरी वाला दूसरा project) को हाथ मत लगाना.

## Server पर 3 command (SSH हो तो, नहीं तो नीचे browser वाला तरीका)

```bash
cd ~/domains/manikstu.com/public_html/api
php artisan migrate --force
php artisan route:clear
php artisan storage:link
```

SSH न हो तो: `migrate.php` वाला browser तरीका `deploy/02-HOSTINGER-BACKEND.md` में है,
या File Manager में `bootstrap/cache/routes-v7.php` delete कर दो (वही पुराना route cache है
जो नया route छिपा देता है)। `storage/` folder writable (755/775) होना चाहिए।

## Test

1. `https://api.manikstu.com/api/careers` → पहले जैसा list दिखे
2. Website पर Careers → Android Developer Intern → Apply → CV लगाकर Submit →
   अब error की जगह "Application received" दिखे
3. `/admin/applications` में entry दिखे, CV download हो
4. Test entry delete कर दो

## Frontend से मेल (कुछ बदलना नहीं है)

Form भेजता है: `name, email, phone, cover_note, resume (pdf/doc/docx, 5MB)` —
controller में validation बिल्कुल यही है, इसलिए frontend में कोई change नहीं चाहिए।
Error format `{message, errors}` भी वही है जो `frontend/src/lib/api.ts` पढ़ता है।
