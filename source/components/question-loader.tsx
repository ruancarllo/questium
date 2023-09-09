import * as Preact from 'preact';

import QuestionCard from './question-card';
import getRenderedComponent from '../helpers/get-rendered-component';

class QuestionLoader extends Preact.Component<Properties> {
  reference: Preact.RefObject<HTMLDivElement>;

  constructor(properties: Properties) {
    super(properties);
    this.reference = Preact.createRef();
  }

  render() {
    return (
      <div ref={this.reference} style={Styles.QuestionLoader} class="question-loader">
        <div style={Styles.Spinner} class="spinner"></div>
      </div>
    )
  }

  async componentDidMount() {
    const intersectionHandler: IntersectionObserverCallback = (entries) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          const questionCard = getRenderedComponent(<QuestionCard universityUrl={this.props.universityUrl}/>);
          document.querySelector('.questions-container').append(questionCard);
        }
      }
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.75
    }

    const observer = new IntersectionObserver(intersectionHandler, observerOptions)
    observer.observe(this.reference.current);
  }
}

class Styles {
  static QuestionLoader: Preact.JSX.CSSProperties = {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  static Spinner: Preact.JSX.CSSProperties = {
    width: '8vw',
    height: '8vw',

    border: '1vw solid #5f3dc4',
    borderTop: '1vw solid transparent',
    borderRadius: '50%',

    animation: 'spin 1s linear infinite'
  }
}

interface Properties {
  universityUrl: string
}

export default QuestionLoader;