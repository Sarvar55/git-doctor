# GitDoctor

GitDoctor, Git kullanımınızı kolaylaştıran ve verimli hale getiren bir TypeScript-powered command-line aracıdır. Bu araç, Git işlemlerinizi daha etkili ve anlaşılır hale getirmek için özellikler sunar.

## Özellikler

-   **Çeviri Yardımcısı**: Commit mesajlarınızı otomatik olarak çevirir.
-   **Emoji Destekli Commit Mesajları**: Commit mesajlarınızı daha anlaşılır ve eğlenceli hale getirmek için emoji kullanımına destek verir.
-   **AI Destekli Commit Mesajları**: Commit mesajlarınızı daha iyi yazmanıza yardımcı olur.
-   **Otomatik Commit ve Push**: Commit mesajlarınızı ve değişikliklerinizi otomatik olarak belirlenen bir brancha push eder.

## Nasıl Kullanılır?

1. **Çeviri Yardımcısı**: Commit mesajlarınızı Türkçe yazın ve GitDoctor, bu mesajları otomatik olarak sizin istediğiniz dile çevirsin.
2. **Emoji Destekli Commit Mesajları**: Commit mesajlarınızın başına emoji ekleyin ve GitDoctor, bu emojiyi kullanarak commit mesajınızı daha anlaşılır hale getirir.
3. **AI Destekli Commit Mesajları**: Commit mesajlarınızın içeriğine göre otomatik olarak uygun bir commit mesajı oluşturur.
4. **Otomatik Commit ve Push**: Commit mesajınızı ve değişikliklerinizi otomatik olarak belirlenen bir brancha push eder.

## Kurulum

Projeyi klonlamak ve bağımlılıkları yüklemek için aşağıdaki komutları kullanın:

```bash
git clone https://github.com/Sarvar55/git-doctor.git
cd git-doctor
npm install
```

## Kullanım

GitDoctor'ı kullanmak için, terminalde aşağıdaki komutu çalıştırın:

```bash
npm start
```

## Yapılandırma

GitDoctor'ın davranışını özelleştirmek için `config.json` dosyasını düzenleyin. Örneğin, çeviri ve emoji seçeneklerini aşağıdaki gibi ayarlayabilirsiniz:

```json
{
	"translate": true,
	"emoji": true,
	"autoPush": true,
	"branch": "dev"
}
```

## Örnek Kullanım

```bash

```

GitDoctor, bu commit mesajını otomatik olarak çevirir ve emoji ekler.

## Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, lütfen öncelikle bir issue oluşturun ve ardından bir pull request gönderin.

## Lisans

GitDoctor, ISC lisansı altında lisanslanmıştır.

## İletişim

Projeyle ilgili sorularınız varsa, lütfen [GitHub](https://github.com/Sarvar55/git-doctor) üzerinden iletişime geçin.

## Destek

Eğer GitDoctor'ı beğenmişseniz, lütfen projeye yıldız vermeyi ve [GitHub](https://github.com/Sarvar55/git-doctor) sayfasında takip etmeyi düşünün.

## Geliştiriciler

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

-   [Sarvar55](https://github.com/Sarvar55)

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
