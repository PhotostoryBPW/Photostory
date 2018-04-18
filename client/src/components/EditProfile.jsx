import React from 'react';
const axios = require('axios');

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            bio: '',
            email: '',
            nameForm: '',
            emailForm: '',
            showNameInput: false,
            showUsernameInput: false,
            showBioInput: false,
            showEmailInput: false,
        }
        this.handleNamePencilIconClick = this.handleNamePencilIconClick.bind(this);
        this.handleUsernamePencilIconClick = this.handleUsernamePencilIconClick.bind(this);
        this.handleBioPencilIconClick = this.handleBioPencilIconClick.bind(this);
        this.handleEmailPencilIconClick = this.handleEmailPencilIconClick.bind(this);
        this.handleNameSaveIconClick = this.handleNameSaveIconClick.bind(this);
        this.handleUsernameSaveIconClick = this.handleUsernameSaveIconClick.bind(this);
        this.handleBioSaveIconClick = this.handleBioSaveIconClick.bind(this);
        this.handleEmailSaveIconClick = this.handleEmailSaveIconClick.bind(this);
        this.handleNameFormChange = this.handleNameFormChange.bind(this);
        this.handleEmailFormChange = this.handleEmailFormChange.bind(this);
    };

    componentWillMount() {
        axios.get('api/userprofileinfo')
        .then (response => {
            this.setState({
                name: response.data[0].userName,
                nameForm: response.data[0].userName,
                username: response.data[0].userHandle,
                bio: response.data[0].bio,
                email: response.data[0].email,
                emailForm: response.data[0].email,
            });
        })
        .catch (err => {
            console.log(err);
        })
    }

    handleNamePencilIconClick() {
        this.setState({showNameInput: true});
    }

    handleUsernamePencilIconClick() {
        this.setState({showUsernameInput: true});
    }

    handleBioPencilIconClick() {
        this.setState({showBioInput: true});
    }

    handleEmailPencilIconClick() {
        this.setState({showEmailInput: true});
    }

    handleNameSaveIconClick() {
        var payload = 
        {
            fullname: this.state.nameForm,
        }
        axios
            .put('http://localhost:3000/api/updatename/', payload)
            .then(response => {
                this.setState({
                    showNameInput: false,
                    name: response.data.fullname,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleUsernameSaveIconClick() {
        console.log('save clicked');
        this.setState({showUsernameInput: false});
    }

    handleBioSaveIconClick() {
        console.log('save clicked');
        this.setState({showBioInput: false});
    }

    handleEmailSaveIconClick() {
        var payload = {
            email: this.state.emailForm
        }
        axios
            .put('http://localhost:3000/api/updateemail/', payload)
            .then(response => {
                console.log(response.data.emailForm);
                this.setState({
                    showEmailInput: false,
                    email: response.data.email,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleNameFormChange(e) {
        this.setState({nameForm: e.target.value});
    }

    handleEmailFormChange(e) {
        this.setState({emailForm: e.target.value});
        console.log(this.state.emailForm);
    }

    render() {
        return(
            <div>
                {
                    this.state.showNameInput ? 
                    <div className = 'attributeRow'>
                    <span className="userAttribute">Name: </span>
                    <label style={{marginRight: '5px'}}>
                        <input className = "profEditInput" maxLength="25" type="text" name="fullname" autoFocus value={this.state.nameForm} onChange={this.handleNameFormChange}/>
                    </label>
                    <span onClick ={this.handleNameSaveIconClick} className="saveProfIcon"><a href="#"><i className="fa fa-save fa-lg"></i></a></span>
                    </div>
                    :
                    <div className = 'attributeRow'>
                    <span className="userAttribute">Name: </span>
                    <span className="userAttributeValue">{this.state.name}</span>
                    <span onClick={this.handleNamePencilIconClick} className="editProfIcon"><a href="#"><i className="fa fa-pencil fa-lg"></i></a></span>
                    </div>
                }
                {
                    this.state.showUsernameInput ? 
                    <div className = 'attributeRow'>
                    <span className="userAttribute">Username: </span>
                    <label style={{marginRight: '5px'}}>
                        <input className = "profEditInput" maxLength="25" type="text" name="fullname"/>
                    </label>
                    <span onClick ={this.handleUsernameSaveIconClick} className="saveProfIcon"><a href="#"><i className="fa fa-save fa-lg"></i></a></span>
                    </div>
                    :
                    <div className = 'attributeRow'>
                    <span className="userAttribute">Username: </span>
                    <span className="userAttributeValue">{this.state.username}</span>
                    <span onClick={this.handleUsernamePencilIconClick} className="editProfIcon"><a href="#"><i className="fa fa-pencil fa-lg"></i></a></span>
                    </div>
                }
                {
                    this.state.showBioInput ? 
                    <div className = 'attributeRow'>
                    <span className="userAttribute">Bio: </span>
                    <label style={{marginRight: '5px'}}>
                        <input className = "profEditInput" maxLength="500" type="text" name="fullname"/>
                    </label>
                    <span onClick ={this.handleBioSaveIconClick} className="saveProfIcon"><a href="#"><i className="fa fa-save fa-lg"></i></a></span>
                    </div>
                    :
                    <div className = 'attributeRow'>
                    <span className="userAttribute">Bio: </span>
                    <span className="userAttributeValue">{this.state.bio}</span>
                    <span onClick={this.handleBioPencilIconClick} className="editProfIcon"><a href="#"><i className="fa fa-pencil fa-lg"></i></a></span>
                    </div>
                }
                {
                    this.state.showEmailInput ? 
                    <div className = 'attributeRow'>
                    <span className="userAttribute">Email: </span>
                    <label style={{marginRight: '5px'}}>
                        <input className = "profEditInput" maxLength="50" type="text" name="fullname" autoFocus value={this.state.emailForm} onChange={this.handleEmailFormChange}/>
                    </label>
                    <span onClick ={this.handleEmailSaveIconClick} className="saveProfIcon"><a href="#"><i className="fa fa-save fa-lg"></i></a></span>
                    </div>
                    :
                    <div className = 'attributeRow'>
                    <span className="userAttribute">Email: </span>
                    <span className="userAttributeValue">{this.state.email}</span>
                    <span onClick={this.handleEmailPencilIconClick} className="editProfIcon"><a href="#"><i className="fa fa-pencil fa-lg"></i></a></span>
                    </div>
                }
            </div>
        )
    }
}

export default EditProfile;