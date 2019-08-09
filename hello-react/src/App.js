import React, { useEffect, useState } from 'react';

const themes = {
  light: {
    color: 'green'
  },
  dark: {
    color: 'red'
  }
}

const ThemeContext = React.createContext({
  theme: themes.light
})

class Button extends React.Component{
  render() {
    return (
      <ThemeContext.Consumer>
        {
          context => {
            return (
              <div style={{color: context.theme.color}} onClick={this.props.onClick}>theme</div>
            )
          }
        }
      </ThemeContext.Consumer>
    )
  }
}

class Button1 extends React.Component{
  static contextType = ThemeContext
  render() {
    const { context } = this
    return (
      <div style={{color: context.theme.color}} onClick={this.props.onClick}>theme</div>
    )
  }
}

class Plus extends React.Component {
  onClick = () => {
    this.props.onPlus()
  }
  render() {
    const { count } = this.props
    return (
      <div onClick={ this.onClick }>plus {count}</div>
    )
  }
}

const ForEffect = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('effect')
    setCount(1)
  })
  return (
    <div>hello {count}</div>
  )
}

function ForFunction(props){
  return (
    <div>function {props.name}</div>
  )
}

class App extends React.Component{
  constructor(props) {
    super()
    this.state = { count: 0, list: [1, 2, 3], theme: 'dark' }
    this.ref = React.createRef()
  }  
  onPlus = () => {
    this.setState({count: this.state.count + 1})
  }
  onRemove = () => {
    this.setState({list: [1, 3]})
  }
  renderList(){
    const { list } = this.state
    return list.map(item => {      
      return <li key={`item-${item}`} onClick={this.onRemove}>{`item-${item}`}</li>
    })
  }
  onChangeTheme = () => {
    const { theme } = this.state
    this.setState({theme: theme === 'light' ? 'dark' : 'light'})
    console.log(this.ref)
  }
  render() {
    return (
      <div className="App">
        <div  ref={this.ref} id="abc">{this.state.count}</div>
        <ThemeContext.Provider value={{theme: themes[this.state.theme]}}>
          <Button1 onClick={this.onChangeTheme}/>
        </ThemeContext.Provider>
        <ForEffect />
        <ForFunction name={123} />
      </div>
    );
  }
  
}
//<Plus onPlus={this.onPlus} count={this.state.count}/>
//<ul>{ this.renderList() }</ul>
export default App;
