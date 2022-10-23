import { expect } from 'chai';
import { getCompletedTodos } from '../components/selectors';

describe('The getCompletedTodos selector', () => {
  it('Returns only completed todos', () => {
    const fakeTodos = [{
      text: "Test Selectors",
      isCompleted: true,
    },
    {
      text: "Not completed",
      isCompleted: false,
    },
    {
      text: "Another not completed",
      isCompleted: false,
    },
    ];

    const expected = [{
      text: "Test Selectors",
      isCompleted: true,
    },];
    const actual = getCompletedTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);


  });
});