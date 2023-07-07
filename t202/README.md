# ATTiny202開発ボード
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
表にattiny202裏にch340k
シルクが長いところに凹みを合わせる
スイッチ二つは側面に実装
EDLCは挟みこむように実装(表がGND)
表面の1608がLED(シルク側がGND)
その裏が電流制限抵抗
それ以外の1608は0.1uF

LED@PB3
SW@PB7

## ATTiny202がない場合は
- sopの一部のジャンパを閉じるとPB0の位置のピンがserialupdiとして機能
- 真ん中のジャンパを閉じると小さく書かれたピン配置にてシリアル変換として機能

