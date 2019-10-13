import React from 'react';
import { Navbar, Button, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";

function NavbarInstance() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="xl">
                <Navbar.Brand href="">
                    <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    {' Algo Master'}
                </Navbar.Brand>
                &emsp; &emsp; &emsp; &emsp;
                <ButtonToolbar>
                    <Button variant="primary" href="#">Add node</Button>
                    &emsp;
                    <Button variant="primary" href="#">Remove node</Button>
                    &emsp;
                    <DropdownButton id="dropdown-basic-button" title="Algorithm">
                        <Dropdown.Item href="#/action-1">LCR Algorithm</Dropdown.Item>
                    </DropdownButton>
                    &emsp;
                    <Button variant="primary" type="submit">Visualize</Button>
                    &emsp;
                    <Button variant="primary" type="submit">Clear</Button>
                    &emsp;
                    <DropdownButton id="dropdown-basic-button" title="Speed">
                        <Dropdown.Item href="#/action-1">Slow</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">Regular</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">Fast</Dropdown.Item>
                    </DropdownButton>
                </ButtonToolbar>
            </Navbar>
        </div>
    );
}

export default NavbarInstance;
