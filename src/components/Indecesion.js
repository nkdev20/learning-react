import React from 'react';
import Header from './Header';
import Action from './Action';
import AddOption from './AddOption';
import Options from './Options';
import OptionModal from './OptionModal';

export default class Indecesion extends React.Component{
    state = {
        'options' :[],
        'selectedOptions' : undefined
    }
  
    // constructor(props)
    // {
    //     super(props);
    //     this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    //     this.handleDeleteOption = this.handleDeleteOption.bind(this);
    //     this.handlePick = this.handlePick.bind(this);
    //     this.handleAddOption = this.handleAddOption.bind(this);
    //     this.state = {
    //         'options': []
    //     };
    // }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            if(options) {
                this.setState(() =>({options}));
            }
        } catch (e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('component will unmount');
    }
    //handle action 
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOptions:option
        }));
    }


    //Handle delete option
    handleDeleteOptions = () => {
        this.setState(() => ({ options : [] }));
    }


    //handle single delte
    handleDeleteOption =(optionToRemove)=>  {
        this.setState((prevState) => ({
            options:prevState.options.filter((option) => optionToRemove !== option )
        }));
    }


    //handle option
    handleAddOption = (option) => {
        if(!option) {
            return "Enter valid value to add";
        } else if (this.state.options.indexOf(option) >-1) {
            return "This option already exist";
        }

        this.setState((prevState) => ({
            'options':prevState.options.concat([option])
        }));
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({
            'selectedOptions' : undefined
        }))
    }

    render(){

        const title = 'indescion';
        const subtitle = 'Put your life in hands of computer';
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOption={this.state.options.length > 0}
                        handlePick = {this.handlePick}
                    />
                    <Options 
                    options = {this.state.options}
                    handleDeleteOptions = {this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                    />
                    <AddOption 
                        handleAddOption = {this.handleAddOption}
                    />  
                </div>

                <OptionModal 
                    selectedOptions = {this.state.selectedOptions} 
                    handleClearSelectedOption = {this.handleClearSelectedOption}
                />
            </div>
        )
    }
}