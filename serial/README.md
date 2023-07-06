# CH340K USBシリアル変換モジュール
CH340Kを用いたUSBシリアル変換モジュール
## 特徴
- 安価
	- 高々￥150
- 高速
	- 1.5Mbps
- 幅広い対象電圧
	- 5V, 3.3V, 2.5V, 1.8V
	- 切り替え不要
	- 恐らくその他電圧も
- ESP32向け自動書き込み回路付き
## 用途
- ESP32の書き込み(自動書き込み回路付き)
- UARTの読み書き
- AVRのserialupdi書き込み機
## 部品
- [CH340K](https://akizukidenshi.com/catalog/g/gI-16306/) *1
- [BSS138](https://akizukidenshi.com/catalog/g/gI-04232/) *2
- [1608サイズ 0.1uF](https://akizukidenshi.com/catalog/g/gP-13374/) *3
## ピン配置
信号線はトレラントだが**電源は5V**なので注意
```
IO0 EN  5V
TXD RXD GND
```
```
-----------------
|               |
|USB         USB|
|USB USB USB USB|
|USB USB USB USB|
|USB USB USB USB|
|               |
| icicic cap fet|
| icicic        |
| icicic cap fet|
|            cap|
|IO0 EN  5V     |
|TXD RXD GND    |
-----------------
```
ESPに書き込む場合はTXD,RXDのみ反転
AVRに書き込む場合はTXD,RXDをまとめてUPDIとする(抵抗もダイオードも不要)
## ドライバ(Windowsのみ)
CH340シリーズはWindowsで使う場合ドライバのインストールが必要
[WCH公式 CH340](https://www.wch-ic.com/products/CH340.html)のCH341SER.EXEを入れる