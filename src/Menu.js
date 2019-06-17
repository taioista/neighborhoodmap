import React, { Component } from 'react';

export class Menu extends Component {

    render(){
        const list = this.props.markers
            .filter(marker => marker.title.toLowerCase().indexOf(this.props.filterTerm.toLowerCase()) >= 0)
            .map(marker => {
                return (
                    <li 
                        key={marker.name}
                        onClick={this.props.itemListClick.bind(this, marker.title)}>
                        {marker.title}
                    </li>
                )
            });
        return (
            <section className={this.props.menuClass}>
                <span id="icon" className="icon" onClick={(event) => this.props.onHamburgerClick()}></span>
                <nav id='menuFilter'>
                    <h2>Choose a place</h2>
                    <input 
                        type="text" 
                        className="textfilter"
                        placeholder="Filter by name"
                        onChange={(event) => this.props.updateFilterTerm(event.target.value)}/>
                    <ul>
                        { list }
                    </ul>
                </nav>
            </section>    
        );
    }
}

export default Menu