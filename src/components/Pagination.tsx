import * as React from 'preact'

export interface IPaginationProps {
  page: number
  total: number
}

export interface IPaginationState {
  start: number
  end: number
}

export default class Pagination extends React.Component<IPaginationProps, IPaginationState> {

  constructor (props: IPaginationProps) {
    super(props)

    const start = props.page - 3
    const end = props.page + 3
    

    this.state = {
      start: start > 0 ? start : 1,
      end: end < props.total ? end : props.total
    }
  }

  render ({page}: IPaginationProps, {start, end}: IPaginationState) {
    const buttons: any[] = []

    for (let i = start; i <= end; i++) {
      let className = 'Pagination__item'

      if (i === page) {
        className += ' Pagination__item--active'
      }

      buttons.push(
        <li className={className}><a href={`/${i}`}>{i}</a></li>
      )
    }

    return (
      <ul className='Pagination'>
        {buttons}
      </ul>
    )
  }
}
