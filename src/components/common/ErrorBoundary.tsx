import { Component, ErrorInfo, ReactNode } from 'react';
import NotFound from '../../pages/errors/NotFound';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.log(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      alert('예기치 않은 오류가 발생했습니다.');
      return this.props.fallback || <NotFound />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
