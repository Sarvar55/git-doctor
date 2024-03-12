// /\*_feat:
// _ mesele öncden index.html dosyasını track etmiş ancak sonra istememiş ve onu .gitignore içine almış
// _ bunu da kontrol etmek gerekir ki eger şu anda varmı yokmu gibi git diff --name-only diğerek bunu yapa bilirzi
// _ izledigi dosyalar eğer .gitignore içinde var ise demek ki önceden takip edilmiş şimdi ise edilmiyor
// _ git rm --cached index.html ile silip sonra işleme devem etmek
// _
// _ refactor: bazen git add . kendisi eder ama commit ypmamıştır bu sefer commit için bir değişiklik yok der.
// _
// _
// _/
