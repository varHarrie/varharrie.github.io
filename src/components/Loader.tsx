import * as React from 'preact'

export interface ILoaderProps {}

export interface ILoaderState {}

export default class Loader extends React.Component<ILoaderProps, ILoaderState> {
  render () {
    return (
      <div className='Loader'></div>
    )
  }
}
