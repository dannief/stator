import React from 'react'

const createComponents = store => {
  class Store extends React.Component {
    constructor(props) {
      super(props)
      store.connectComponentState(this, props.keys)
    }
    render() {
      return this.props.children(this.state)
    }
  }

  const connectStore = (keys, mapStateToProps = null) => WrappedComponent =>
    class extends React.Component {
      render() {
        return (
          <Store keys={keys}>
            {state => (
              <WrappedComponent
                state={state}
                {...mapStateToProps && mapStateToProps(state)}
                {...this.props}
              />
            )}
          </Store>
        )
      }
    }

  return {Store, connectStore}
}
export {createComponents}
