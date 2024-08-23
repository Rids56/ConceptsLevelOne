import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false
    };

    static getDerivedStateFromError(_: Error): State {
        console.log('getDerivedStateFromError called');
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log('componentDidCatch called');
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        console.log('Rendering ErrorBoundary', this.state);
        if (this.state.hasError) {
            console.log('ErrorBoundary has an error. Rendering fallback UI.');
            return <h1>Sorry.. there was an error</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
