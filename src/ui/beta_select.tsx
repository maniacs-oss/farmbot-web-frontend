import * as React from "react";
import { DropDownItem } from "../ui/beta_select";

type OptionComponent = React.ComponentClass<DropDownItem>
  | React.StatelessComponent<DropDownItem>;

export interface DropDownItem {
  /** Value passed to the onClick cb and also determines the "chosen" option. */
  value?: number;
  /** Name of the item shown in the list. */
  label: string;
  /** Component internal use only unless there's an edge case for it. */
  hidden?: boolean;
  /** To determine group-by styling on rendered lists. */
  heading?: boolean;
}

export interface SelectProps {
  /** The list of rendered options to select from. */
  dropDownItems: DropDownItem[];
  /** Determine whether the select list should always be open. */
  isOpen?: boolean;
  /** Custom JSX child rendered instead of a default item. */
  optionComponent?: OptionComponent;
  /** Optional className for `select`. */
  className?: string;
  /** Fires when option is selected. */
  onChange?: (newValue: DropDownItem) => void;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Determines what label to show in the select box. */
  value?: number | null;
}

export interface SelectState {
  currentText: string;
  isOpen: boolean;
  value: number | null;
}

export class BetaSelect extends React.Component<SelectProps, Partial<SelectState>> {
  constructor() {
    super();
    this.state = {
      currentText: "",
      isOpen: false,
      value: null
    };
  }

  componentWillMount() {
    this.setState({
      isOpen: !!this.props.isOpen
    });
  }

  updateInput(e: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({ currentText: e.currentTarget.value });
  }

  open() { this.setState({ isOpen: true }); }

  /** Closes the dropdown ONLY IF the developer has not set this.props.isOpen to
   * true, since that would indicate the developer wants it to always be open.
    */
  maybeClose = () => {
    this.setState({ isOpen: (this.props.isOpen || false) });
  }

  handleSelectOption(option: DropDownItem) {
    (this.props.onChange || (() => { }))(option);
  }

  custItemList = (items: DropDownItem[]) => {
    if (this.props.optionComponent) {
      let Comp = this.props.optionComponent;
      return items
        .map((p, i) => <Comp {...p} key={p.value || `@@KEY${i}`} />);
    } else {
      throw new Error(`You called custItemList() when props.optionComponent was
      falsy. This should never happen.`);
    }
  }

  normlItemList = (items: DropDownItem[]) => {
    let { onChange } = this.props;
    return items.map((option: DropDownItem) => {
      let { hidden, value, heading, label } = option;
      let classes = "select-result";
      if (hidden) { classes += " is-hidden"; }
      if (heading) { classes += " is-header"; }

      return <div key={value || label}
        className={classes}
        onClick={() => { (onChange || function () { })(option); }}>
        <label>{label}</label>
      </div>;
    });
  }

  // returns dropDownItems that match the user's search term.
  filterByInput = () => {
    return this.props.dropDownItems.filter((option: DropDownItem) => {
      let query = (this.state.currentText || "").toUpperCase();
      return (option.label.toUpperCase().indexOf(query) > -1);
    });
  }

  render() {
    let { className, optionComponent, placeholder} = this.props;
    let { isOpen } = this.state;
    // Dynamically chose custom vs. standard list item JSX based on options:
    let renderList = (optionComponent ? this.custItemList : this.normlItemList);
    return <div className={"select " + (className || "")}>
      <div className="select-search-container">
        <input type="text"
          onChange={this.updateInput.bind(this)}
          onClick={this.open.bind(this)}
          onBlur={this.maybeClose}
          placeholder={placeholder || "Search..."} />
      </div>
      <div className={"select-results-container is-open-" + !!isOpen}>
        {renderList(this.filterByInput())}
      </div>
    </div>;
  }
}
