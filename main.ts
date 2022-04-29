function turnOn () {
    pins.digitalWritePin(DigitalPin.P2, 1)
    while (alarm_on == 1 && alarm_off == 0) {
        if (led_on == 0) {
            led_on = 1
            pins.digitalWritePin(DigitalPin.P1, 1)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
                `)
        } else {
            led_on = 0
            pins.digitalWritePin(DigitalPin.P1, 0)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        }
        if (pins.digitalReadPin(DigitalPin.P0) == 0) {
            alarm_on = 0
            radio.sendValue("alarm", 0)
        }
    }
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
    alarm_off = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
radio.onReceivedValue(function (name, value) {
    if (name == "ralarm") {
        if (value == 1) {
            alarm_on = 1
        } else {
            alarm_on = 0
            alarm_off = 1
        }
    }
})
let alarm_off = 0
let led_on = 0
let alarm_on = 0
radio.setGroup(99)
alarm_on = 0
led_on = 0
alarm_off = 0
basic.forever(function () {
    if (alarm_on == 1) {
        turnOn()
    } else {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
})
