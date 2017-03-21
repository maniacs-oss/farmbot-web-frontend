import * as React from "react";
import { RegimenListItem } from "./regimen_list_item";
import { AddRegimen } from "./add_button";
import { Widget, WidgetHeader, WidgetBody, Row, Col } from "../../ui/index";
import { RegimensListProps } from "../interfaces";

export class RegimensList extends React.Component<RegimensListProps, {}> {
  render() {
    return <Widget className="regimen-list-widget">
      <WidgetHeader title="Regimens"
        helpText={`This is a list of all of your regimens.
                   Click one to begin editing it.`}>
        <AddRegimen dispatch={this.props.dispatch} />
      </WidgetHeader>
      <WidgetBody>
        <Row>
          <Col xs={12}>
            {this
              .props
              .regimens
              .map((regimen, inx) => <RegimenListItem
                dispatch={this.props.dispatch}
                regimen={regimen}
                index={inx}
                key={inx}
                unsavedChanges={this.props.unsavedChanges} />)
            }
          </Col>
        </Row>
      </WidgetBody>

      <AddRegimen className="plus-button"
        dispatch={this.props.dispatch}>
        <i className="fa fa-plus"></i>
      </AddRegimen>

    </Widget>;
  }
}
