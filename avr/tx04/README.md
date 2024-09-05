# tinyAVR X04 開発基板

ATtiny 204, 404, 804, 1604 の開発基板

USB-UART変換`CH340E`によるSerialUPDI書込回路付き

アナログスイッチ`TS5A23159DGSR`による書込<=>UART切替付き

<https://github.com/BlackBrix/SerialUPDI-programmer>


## エラッタ

アナログスイッチのUPDIとUARTが逆に配線されている

`avrdude -c seralupdi -p attiny1604 -P /dev/ttyUSB0`

Linuxでは疎通するがWindowsではしない

RTS#ピンのデフォルト状態の違いのせい?

platformioでシリアルモニタを見るには

`pio device monitor --rts 0`

### 解決策

- ***Linuxをインストール***
  - 全ての機能を使える
- アナログスイッチを実装せずCH340E寄りの列の端のパッド2個ずつをハンダブリッジでショート
  - CH340Eの配線をUPDIにそのまま流す
  - UART切り替えは使えない
  - UARTの抵抗も実装する必要がない


![回路図](img/circuit.png)

![表面](img/fcu.png)

![裏面](img/bcu.png)

![表面実写](img/front.jpg)

![裏面実写](img/back.jpg)


