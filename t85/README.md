# ATtiny85 Micronucleus 開発ボード

## 機能

- 超小型8ピンDIPサイズ
- LEDとボタンを搭載
- EDLC電源基板付き

## 部品

- [ATTiny85](https://akizukidenshi.com/catalog/g/gI-09574/)
- バイパスコンデンサ 1608サイズ 大きめに4.7uFとか
- [表面実装タクトスイッチ](https://akizukidenshi.com/catalog/g/gP-14888/)
- LED
  - 1608サイズ LED
  - 1608サイズ LED電流制限抵抗 10kとか
- USB部
  - CC用抵抗 1608サイズ 5.1k *2
  - ダンピング抵抗 1608サイズ 100R(47Rも可) *2
  - プルアップ抵抗 1608サイズ 1.5k
  - [ツェナーダイオード 3.6v SOD323Fパッケージ(UMD2)](https://akizukidenshi.com/catalog/g/gI-07435/) *2

## 組み立て

表にスイッチとチップ部品

```text
 | USB |
   S W
     101
     -Z<-
-|<- 101
103  -Z<-
-||- 152
```

裏にattiny85と5k1*2
シルクが長いところに凹みを合わせる

SW@PB0
LED@PB1

## ブートローダーの書き込み

<https://github.com/micronucleus/micronucleus>をビルド
windowsはドライバをインストール
ファームウェアをISP書き込み機を用いてを書き込む

参考
<https://qiita.com/nak435/items/67aca33ca49b6f328faa>

## 作例

4和音電子オルゴール <https://github.com/McbeEringi/avr-musicbox>
