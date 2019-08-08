import React from 'react';

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tags: this.props.tags || [], text: ""};
        console.log(this.props.tags);
    }

    handleChange(e){
        let text = e.target.value;
        this.setState({text: text});
    }

    addTag(e){
        e.preventDefault();
        let tag = this.state.text.trim();
        this.props.addTag(this.props.id, tag);
    
        this.refs.tagForm.value = "";
        this.setState({text: ""});
    }

    render() {
        return (
        
        <div>
            <div className="tagList">
                {this.props.tags.map((tag, idx) => 
                <div className="tagItem" key={idx}> {tag} </div>
            )}
            </div>
            <form onSubmit={this.addTag.bind(this)}>
                <input className="tagInput" type="text" placeholder="Add a tag" ref="tagForm" onChange={this.handleChange.bind(this)}/>
            </form>
        </div>
           
        );
    }
}

export default Tags;