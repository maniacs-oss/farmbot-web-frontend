import * as React from "react";
import { Everything } from "../interfaces";
import { ToolsState } from "./interfaces";
import { ToolBayList, ToolBayForm, ToolList, ToolForm } from "./components";
import { connect } from "react-redux";
import { Page, Row, Col } from "../ui";

@connect((state: Everything) => state)
export class Tools extends React.Component<Everything, ToolsState> {
    render() {
        let editing = this.props.tools.editorMode;
        let isEditingTools = this.props.tools.tools.isEditing;
        return <Page>
            <Row>
                <Col>
                    {!editing && (
                        <ToolBayList
                            all={this.props.tools}
                            dispatch={this.props.dispatch}
                            />
                    )}
                    {editing && (
                        <ToolBayForm
                            all={this.props.tools}
                            dispatch={this.props.dispatch}
                            />
                    )}
                </Col>
                <Col>
                    {!isEditingTools && (
                        <ToolList
                            all={this.props.tools}
                            dispatch={this.props.dispatch}
                            />
                    )}
                    {isEditingTools && (
                        <ToolForm
                            all={this.props.tools}
                            dispatch={this.props.dispatch}
                            />
                    )}
                </Col>
            </Row>
        </Page>;
    }
}
