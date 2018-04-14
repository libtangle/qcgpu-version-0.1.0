// This file generates .dat files for use in the white paper, based on the output of the benchmarks

const path = require('path')

function libquantum() {
    // Generate the dat files for the Libquantum tests
    const libquantumDirectories = [
        'Register Gate Application',
        'Create Register',
        'Controlled Gate Application',
        'Single Gate Application'
    ]

    // Go through and get the data
    console.log(libquantumDirectories
        .map(p => [p, path.join(__dirname, 'target/criterion', p, 'libquantum/new')])
        .map(p => {
            const name = p[0]
            const data = require(path.join(p[1], 'estimates.json'))

            return `(${name}, ${data.Mean.point_estimate / 1000000})` // Conversion of nanoseconds to miliseconds
        }).join(" "))

    console.log()

    console.log(libquantumDirectories
        .map(p => [p, path.join(__dirname, 'target/criterion', p, 'qcgpu/new')])
        .map(p => {
            const name = p[0]
            const data = require(path.join(p[1], 'estimates.json'))

            return `(${name}, ${data.Mean.point_estimate / 1000000})` // Conversion of nanoseconds to miliseconds
        }).join(" "))

    console.log(libquantumDirectories.join(","))
}

function qiskit() {
    const directories = [
        'qcgpu Hadamard All And Measure 1000',
        'qiskit Hadamard All And Measure 1000'
    ]

    const numbers = [2, 4, 6, 8]


    directories.map(p => {
        const data = []
        numbers.forEach(n => {
            const d = require(path.join(__dirname, 'target/criterion', p, n.toString(), '/new', 'estimates.json'))
            const info = d.Mean.point_estimate / 1000000
            data.push(`(${n}, ${info})`)
        })
        console.log(p)
        console.log(data.join(" "))
    })
}

function core() {
    const directories = [
        '50 Gate Applications',
        'Controlled Gate Application',
        'Single Gate Application',
        'Single Measurement',
        'State Creation',
        'Thousand Measurements'
    ]

    const numbers = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

    directories.map(p => {
        const data = []
        numbers.forEach(n => {
            const d = require(path.join(__dirname, 'target/criterion', p, n.toString(), '/new', 'estimates.json'))
            const info = d.Mean.point_estimate / 1000000
            data.push(`{${n},${info.toPrecision(3)}}`)
        })
        console.log(p)
        console.log('{' + data.join(",") + '}')
    })
}
core()
