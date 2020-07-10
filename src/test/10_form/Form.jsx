import React, {Component, Fragment} from 'react';

const listSelect = [
    {title: "Frontend developer"},
    {title: "Backend developer"},
];

// const Select = () => {
//     <Fragment>
//         listSelect.map((vl, index) => (
//         <optional key={index}>
//             {vl}
//         </optional>
//         ))
//     </Fragment>
// }


class Form extends Component {


    state = {
        inputText: '',
        textAreaText: '',
        selectText: '',
        showData: {
            name: '',
            text: '',
            position: '',
        }
    };

    // handleInputChange = ({ target: { value } }) => {
    //     this.setState({
    //         inputText: value,
    //     })
    // };
    //
    // handleTextareaChange = ({ target: { value } }) => {
    //     this.setState({
    //         textAreaText: value,
    //     })
    // };
    //
    // handleSelectChange = ({ target: { value } }) => {
    //     this.setState({
    //         selectText: value,
    //     })
    // };

    componentWillMount() {
        console.log('cwm', this.inputText)
    }

    componentDidMount() {
        console.log('cdm', this.inputText)
    }

    handleShow = (e) => {
        e.preventDefault();
        const { inputText, textAreaText, selectText } = this.state;
        this.setState({
            inputText: '',
            textAreaText: '',
            selectText: '',
            showData: {
                name: inputText,
                text: textAreaText,
                position: selectText,
            }
        })
    };

    inputText = React.createRef();
    textareaText = React.createRef();
    selectText = React.createRef();

    handleChange = () => {
        this.setState({
            inputText: this.inputText.current.value,
            textAreaText: this.textareaText.current.value,
            selectText: this.selectText.current.value,
        })
    };

    render(){
        const { inputText, textAreaText, showData, selectText } = this.state;
        const { name, text, position } = showData;
        return (
            <Fragment>
                <form>
                    <label>
                        Name:
                        <input ref={this.inputText} type="text" name="name" value={ inputText } onChange={this.handleChange} />
                    </label>
                    <label htmlFor="text">Text:</label>
                    <textarea ref={this.textareaText} id="text" value={textAreaText} onChange={this.handleChange}></textarea>
                    <button onClick={this.handleShow}>Show</button>
                    <select ref={this.selectText} value={selectText} onChange={this.handleChange}>{
                        listSelect.map((vl, index)=>(
                            <option key={index} value={vl.title}>{vl.title}</option>
                        ))
                    }
                    </select>

                    <h2>{ name }</h2>
                    <h3>{ text }</h3>
                    <h3>{ position }</h3>
                </form>
            </Fragment>
        )
    }

}

export default Form;