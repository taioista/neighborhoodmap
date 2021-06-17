import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu'

export class MenuContainer extends Component {

    render(){
        const handleMenuButtonClick = this.props.handleMenuButtonClick;
        const handleMenuStateChange = this.props.handleMenuStateChange;
        const list = this.props.markers
            .filter(marker => marker.title.toLowerCase().indexOf(this.props.filterTerm.toLowerCase()) >= 0)
            .map(marker => {
                return (
                    <li 
                        key={marker.name}
                        tabIndex="0"
                        role="listitem"
                        onClick={this.props.itemListClick.bind(this, marker.title)}>
                        {marker.title}
                    </li>
                )
            });
        return (
            <div className="menu">
                <Menu
                    styles={this.props.styles}
                    pageWrapId="page-wrap"
                    outerContainerId={ this.props.outerContainerId }
                    isOpen={ this.props.menuIsOpen }
                    onStateChange={handleMenuStateChange}
                    noOverlay={ this.props.menuIsSticky }
                    disableCloseOnEsc={ this.props.menuIsSticky }
                >
                    <div role="searchbox">
                        <h2>Choose a place</h2>
                        <label htmlFor="textfilter">Choose a point of interest:</label>
                        <input 
                            type="text" 
                            className="textfilter"
                            name="textfilter"
                            placeholder="Filter by name"
                            role="search"
                            onChange={(event) => this.props.updateFilterTerm(event.target.value)}/>
                        <ul>
                            { list }
                        </ul>
                    </div>
                </Menu>

                <main id="page-wrap">
                    <button
                    type="button"
                    onClick={handleMenuButtonClick}
                    hidden={this.props.menuIsSticky}
                    className="button"
                    >
              ☰
            </button>
                </main>
            </div>
        )
    }
}

export default MenuContainer