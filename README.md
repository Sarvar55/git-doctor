# GitDoctor

GitDoctor, Git kullanımınızı kolaylaştıran ve verimli hale getiren bir TypeScript-powered command-line aracıdır. Bu araç, Git işlemlerinizi daha etkili ve anlaşılır hale getirmek için özellikler sunar.

## Özellikler

-   **Çeviri Yardımcısı**: Commit mesajlarınızı otomatik olarak çevirir.
-   **Emoji Destekli Commit Mesajları**: Commit mesajlarınızı daha anlaşılır ve eğlenceli hale getirmek için emoji kullanımına destek verir.
-   **AI Destekli Commit Mesajları**: Commit mesajlarınızı daha iyi yazmanıza yardımcı olur.
-   **Otomatik Commit ve Push**: Commit mesajlarınızı ve değişikliklerinizi otomatik olarak belirlenen bir brancha push eder.

## Nasıl Kullanılır?

1. **Çeviri Yardımcısı**: Commit mesajlarınızı istediğini dilde yazın ve GitDoctor, bu mesajları otomatik olarak sizin istediğiniz dile çevirsin.
2. **Emoji Destekli Commit Mesajları**: Commit mesajlarınızın başına emoji ekleyin ve GitDoctor, bu emojiyi kullanarak commit mesajınızı daha anlaşılır hale getirir.
3. **AI Destekli Commit Mesajları**: Commit mesajlarınızın içeriğine göre otomatik olarak uygun bir commit mesajı oluşturur.
4. **Otomatik Commit ve Push**: Commit mesajınızı ve değişikliklerinizi otomatik olarak belirlenen bir brancha push eder.

## CLI Kullanımı

GitDoctor CLI, git-doctor veya gitd komutları ile çağrılabilir. Bu komutlar, projenin `build/cli/bin.js` dosyasını çalıştırır.

```bash
git-doctor
```

```bash
gitd
```

### Seçenekler

GitDoctor CLI, çeşitli seçenekler sunar:

-   `-s, --source-lang <string>`: Kaynak dilini belirtir. Varsayılan değer `tr` (Türkçe).
-   `-t, --target-lang <string>`: Hedef dilini belirtir. Varsayılan değer `en` (İngilizce).
-   `-a, --auto-trans <boolean>`: Otomatik çeviri özelliğini etkinleştirir veya devre dışı bırakır. Varsayılan değer `false`.
-   `-k, --api-key <string>`: Google API key'ini belirtir.(AI destekli commit mesajları için gerekli)
-   `-c, --config`: Tüm yapılandırmaları gösterir.

## Örnek kullanım

```bash
git-doctor -s tr -t en -a true -k YOUR_GOOGLE_API_KEY
```

Bu komut, kaynak dil olarak Türkçe (tr), hedef dil olarak İngilizce (en), otomatik çeviri özelliğini etkinleştirir ve Google API key'ini belirtir.

-   [GOOGLE API KEY](https://makersuite.google.com/app/apikey) Google API KEY'i burada ala bilirsiniz.

## Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, lütfen öncelikle bir issue oluşturun ve ardından bir pull request gönderin.

## Lisans

GitDoctor, ISC lisansı altında lisanslanmıştır.

## İletişim

Projeyle ilgili sorularınız varsa, lütfen [GitHub](https://github.com/Sarvar55/git-doctor) üzerinden iletişime geçin.

## Destek

Eğer GitDoctor'ı beğenmişseniz, lütfen projeye yıldız vermeyi ve [GitHub](https://github.com/Sarvar55/git-doctor) sayfasında takip etmeyi düşünün.

## Geliştiriciler

-   [Sarvar55](https://github.com/Sarvar55)

## Dil destekleri

-   Türkçe: tr
-   Azerbaycanca: az
-   İngilizce: en
-   Rusça: ru
-   Almanca: de
-   Fransızca: fr
-   İspanyolca: es
-   Çince: zh
-   Japonca: ja
-   Arapça: ar

## Katkıda Bulunanlar

Bu projeye katkıda bulunanların listesi [burada](https://github.com/Sarvar55/git-doctor/graphs/contributors) bulunabilir.

## Sürüm Geçmişi

Projenin sürüm geçmişi [burada](https://github.com/Sarvar55/git-doctor/releases) bulunabilir.

## Proje Yapısı

GitDoctor, TypeScript ile yazılmıştır ve Axios, Chalk, Cli-select, Execa, Timers-promises ve @clack/prompts gibi kütüphaneleri kullanır. Proje, ESLint ve Prettier ile kod kalitesini korumak için yapılandırılmıştır.

## Bağımlılıklar

-   [axios](https://www.npmjs.com/package/axios)
-   [chalk](https://www.npmjs.com/package/chalk)
-   [cli-select](https://www.npmjs.com/package/cli-select)
-   [execa](https://www.npmjs.com/package/execa)
-   [timers-promises](https://www.npmjs.com/package/timers-promises)
-   [@clack/prompts](https://www.npmjs.com/package/@clack/prompts)

## Lisans

[MIT](https://choosealicense.com/licenses/mit/)

## Teşekkiler

Bu projeye katkıda bulunan herkese teşekkür ederiz!
