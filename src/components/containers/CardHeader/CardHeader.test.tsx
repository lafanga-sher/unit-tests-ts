import React from 'react'
import { shallow } from 'enzyme'
import CardHeader from './index'

describe(' Testing CardHeader component ', () => {
  let component

  beforeEach(() => {
    component = shallow(<CardHeader />)
  })
  
  test('App is working.', () => {
    expect(component.length).toBe(1)
  })


})