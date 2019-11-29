import React, { Component, useState, useEffect } from 'react'
import './input.css'
export default class Input extends Component {

    constructor(props) {
        super(props)

        this.state = {
            blockSplit: [],
            validateFormat: false,
            currentRef: 0,
            allRefSize: 0,
            value: ''
        }

        this.allRef = []
    }


    static defaultProps = {
        format: "9-9999-99999-99-9",
        blockClass: '',
        containerClass: '',
        secureText: false,
    }

    componentDidMount = () => {
        const { format } = this.props
        this.setState({
            validateFormat: valid(format),
            blockSplit: split(format),
            allRefSize: len(split(format).filter(isNumber))
        })
    }

    nextRef = () => {
        console.log(this.allRef)
        this.setState(prev => ({ currentRef: prev.currentRef + 1 }), () => {
            const { currentRef, allRefSize } = this.state
            if (currentRef < allRefSize) {
                this.allRef[currentRef].focus()
            }
        })
    }

    prevRef = () => {
        this.setState(prev => ({ currentRef: prev.currentRef > 0 ? prev.currentRef - 1 : 0 }), () => {
            const { currentRef, } = this.state
            if (currentRef > -1) {
                this.allRef[currentRef].focus()
            }
        })
    }

    setValue = value => this.setState(prev => ({ value: prev.value + value }))

    shouldComponentUpdate = (nextProps, nextState) => {
        return true
    }


    render() {
        const { validateFormat, blockSplit } = this.state
        console.log('render!!!')
        return (
            <div className={this.props.containerClass} >
                {
                    validateFormat ? blockSplit.map((el, i) => isNumber(el) ?
                        <Block
                            key={i.toString()}
                            ref={ref => len(this.allRef) == this.state.allRefSize ? null : this.allRef[len(this.allRef)] = ref}
                            blockClass={this.props.blockClass}
                            size={len(el)}
                            nextRef={this.nextRef}
                            prevRef={this.prevRef}
                            setValue={this.setValue}
                        /> : el) :
                        "format error"
                }
            </div>
        )
    }
}

const Block = React.forwardRef(({ blockClass, size, nextRef, prevRef, setValue }, ref) => {
    const [number, setNumber] = useState('')
    useEffect(() => {
        if (size == len(number)) {
            setValue(number)
            nextRef()
        }
    }, [number])

    return (
        <input
            ref={ref}
            type='number'
            style={{ width: `calc(${size} * 10px + 20px)` }}
            className={`blockStyled ${blockClass}`}
            value={number}
            onChange={e => len(number) < size || len(e.target.value) < len(number) ? setNumber(e.target.value) : null}

            onKeyDown={e => {
                if (e.keyCode == 8 && len(number) == 0) {
                    prevRef()
                }
            }}
        />
    )

})
// ======================================================================================
// function
function len(blockSize) {
    return blockSize.length
}

function split(format) {
    return format.split(/(-|\s)/)
}

function valid(format = '') {
    const pattern = /(\d|-|\s)/
    return format.split('').every(el => pattern.test(el))
}

function isNumber(block) {
    return /\d/.test(block)
}