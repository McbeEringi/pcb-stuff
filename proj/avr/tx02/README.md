# 8pin tinyAVR開発ボード

## 機能

- serialupdi書き込み機内蔵
- ELDC搭載で電源無しで駆動

## 部品

- [ATTiny202](https://akizukidenshi.com/catalog/g/gI-15731/)
- serialupdi
  - [CH340K](https://akizukidenshi.com/catalog/g/gI-16306/)
  - [1608サイズ 0.1uF](https://akizukidenshi.com/catalog/g/gP-13374/) *2
- LED
  - 1608サイズ LED
  - 1608サイズ LED電流制限抵抗(10kとか)
- スイッチ
  - [表面実装タクトスイッチ](https://akizukidenshi.com/catalog/g/gP-14888/)
- EDLC
  - [縦型EDLC 1.5F](https://akizukidenshi.com/catalog/g/gP-04300/)
  - [スライドスイッチ](https://akizukidenshi.com/catalog/g/gP-15707/)

## 組み立て&使い方

表にch340k裏にattiny202
シルクが長いところに凹みを合わせる

裏面の部品配置

```text
 |USB|

  avr

| | ->|-
= ξ
| | -||-
```

LED@PB3
SW@PB7

`avrdude -p t202 -c serialupdi`
