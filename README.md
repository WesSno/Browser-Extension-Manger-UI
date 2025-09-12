# Frontend Mentor - Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [View Solution](https://github.com/WesSno/Browser-Extension-Manger-UI)
- Live Site URL: [View Live Site](https://kkwatia-extension-board.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

I learnt how to manage state or store data in react and how to bind methods in a class-based component.

```jsx
constructor() {
    super();

    this.state = {
      theme: "light",
      extensionData: data.map((card) => ({
        ...card,
        isRemoved: false,
        isAnimating: false,
      })),
      filter: "all",
    };

    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }
```

I also learnt how to modify data or state in react.

```jsx
toggleActive(name) {
    this.setState(
      (prevState) => {
        const updatedActiveness = prevState.extensionData.map((card) =>
          card.name === name
            ? { ...card, isActive: !card.isActive, isAnimating: true }
            : card
        );
        return { extensionData: updatedActiveness };
      },

      () => {
        setTimeout(() => {
          this.setState((prevState) => ({
            extensionData: prevState.extensionData.map((card) =>
              card.name === name ? { ...card, isAnimating: false } : card
            ),
          }));
        }, 300);
      }
    );
  }
```

I learned how to pass props to a component in a react.

```jsx
<Card
        key={card.name}
        name={card.name}
        description={card.description}
        isActive={card.isActive}
        isAnimating={card.isAnimating}
        isRemoved={card.isRemoved}
        imgUrl={card.logo}
        theme={this.state.theme}
        onToggle={() => this.toggleActive(card.name)}
        onRemove={() => this.removeCard(card.name)}
        onRestore={() => this.restoreCard(card.name)}
      />
    ));
```

I learnt of React Context. This feature allowed me to not pass down **theme** and **toggleTheme** as props but make them into items that any component can grab their info directly.

```jsx
<ThemeContext.Provider
  value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
>
  <div className={`app ${this.state.theme}`}>
    <main>
      <Header
        moonIcon={moonIcon}
        sunIcon={sunIcon}
        darkLogo={darkLogo}
        lightLogo={lightLogo}
      />

      <Status setFilter={this.setFilter} filter={this.state.filter} />

      <div className="all-cards">{extensionCards}</div>
    </main>
  </div>
</ThemeContext.Provider>;

import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

function Header({ moonIcon, sunIcon, darkLogo, lightLogo }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <nav className={`nav ${theme}`}>
        <div className="logo">
          <img src={theme === "light" ? darkLogo : lightLogo} alt="logo" />
        </div>

        <button className={`theme ${theme}`} onClick={toggleTheme}>
          <img
            src={theme === "light" ? moonIcon : sunIcon}
            alt="toggle theme"
            className="theme-logo"
            style={{ width: "1.2rem", height: "1.2rem" }}
          />
        </button>
      </nav>
    </header>
  );
}

export default Header;
```

## Author

- Website - [Kofi Baafi Kwatia](https://github.com/WesSno)
- Frontend Mentor - [@WesSno](https://www.frontendmentor.io/profile/WesSno)
