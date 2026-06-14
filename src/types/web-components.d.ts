import "react";

type WebComponentProps<T = Record<string, never>> = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  T;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "app-card": WebComponentProps<{
        variant?: string;
        hoverable?: boolean;
      }>;
      "app-button": WebComponentProps<{
        variant?: string;
        size?: string;
        disabled?: boolean;
        loading?: boolean;
      }>;
      "app-badge": WebComponentProps<{
        variant?: string;
        size?: string;
      }>;
      "app-progress": WebComponentProps<{
        value?: string;
        max?: string;
        variant?: string;
        striped?: boolean;
        animated?: boolean;
        label?: string;
      }>;
      "app-tabs": WebComponentProps<{
        tabs?: string;
        active?: string;
      }>;
      "app-accordion": WebComponentProps<{
        items?: string;
        multiple?: boolean;
      }>;
      "app-modal": WebComponentProps<{
        open?: boolean;
        title?: string;
      }>;
      "app-toast": WebComponentProps<{
        message?: string;
        variant?: string;
        duration?: string;
        visible?: boolean;
      }>;
      "app-avatar": WebComponentProps<{
        src?: string;
        name?: string;
        size?: string;
        status?: string;
      }>;
      "app-stat-card": WebComponentProps<{
        title?: string;
        value?: string;
        change?: string;
        trend?: string;
        icon?: string;
      }>;
      "app-nav-link": WebComponentProps<{
        href?: string;
        active?: boolean;
        icon?: string;
      }>;
      "app-theme-toggle": WebComponentProps<{
        theme?: string;
      }>;
      "app-chart-bar": WebComponentProps<{
        data?: string;
        height?: string;
      }>;
      "app-data-table": WebComponentProps<{
        columns?: string;
        rows?: string;
      }>;
      "app-search-input": WebComponentProps<{
        placeholder?: string;
        value?: string;
      }>;
      "app-alert": WebComponentProps<{
        variant?: string;
        title?: string;
        dismissible?: boolean;
      }>;
      "wc-light-dom": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "wc-open-shadow": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "wc-closed-shadow": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "wc-slot-demo": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "wc-css-pierce": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "wc-event-boundary": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "wc-simple-h1": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
