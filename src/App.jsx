import React from "react";
import Header from "./components/Header";
import Status from "./components/ExtensionStatus";
import Card from "./components/ExtensionCard";
import moonIcon from "./assets/images/icon-moon.svg";
import sunIcon from "./assets/images/icon-sun.svg";
import darkLogo from "./assets/images/logo.svg";
import lightLogo from "./assets/images/logo-white.png";
import data from "./components/data.json";
import ThemeContext from "./components/ThemeContext";
import "./App.css";

class App extends React.Component {
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

  toggleTheme() {
    this.setState((prevState) => ({
      theme: prevState.theme === "light" ? "dark" : "light",
    }));
  }

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

  setFilter = (filterType) => {
    this.setState({ filter: filterType });
  };

  removeCard = (name) => {
    this.setState(
      (prevState) => ({
        extensionData: prevState.extensionData.map((card) =>
          card.name === name
            ? { ...card, isRemoved: true, isAnimating: true }
            : card
        ),
      }),
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
  };

  restoreCard = (name) => {
    this.setState(
      (prevState) => ({
        extensionData: prevState.extensionData.map((card) =>
          card.name === name
            ? { ...card, isRemoved: false, isAnimating: true }
            : card
        ),
      }),
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
  };

  render() {
    const filteredExtensions = this.state.extensionData.filter((card) => {
      const animating = !!card.isAnimating;

      if (this.state.filter === "active") {
        return (!card.isRemoved && card.isActive) || animating;
      }
      if (this.state.filter === "inactive") {
        return (!card.isRemoved && !card.isActive) || animating;
      }
      if (this.state.filter === "removed") {
        return card.isRemoved || animating;
      }
      return !card.isRemoved || animating;
    });

    const extensionCards = filteredExtensions.map((card) => (
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

    return (
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
      </ThemeContext.Provider>
    );
  }
}

export default App;
