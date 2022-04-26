function turnOn () {
    pins.digitalWritePin(DigitalPin.P2, 1)
    while (alarm_on == 1) {
        if (led_on == 0) {
            led_on = 1
            pins.digitalWritePin(DigitalPin.P1, 1)
        } else {
            led_on = 0
            pins.digitalWritePin(DigitalPin.P1, 0)
        }
        if (pins.digitalReadPin(DigitalPin.P0) == 0) {
            alarm_on = 0
        }
    }
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
    radio.sendValue("stop_alarm", 1)
}
radio.onReceivedValue(function (name, value) {
    if (name == "alarm") {
        if (value == 1) {
            alarm_on = 1
            turnOn()
        } else {
            alarm_on = 0
        }
    }
})
let led_on = 0
let alarm_on = 0
radio.setGroup(99)
alarm_on = 0
led_on = 0
