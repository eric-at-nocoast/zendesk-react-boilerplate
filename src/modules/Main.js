import React from "react";
import styled from "styled-components";
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Button} from '@zendeskgarden/react-buttons';
import { Field, Label, Textarea } from '@zendeskgarden/react-forms';
//import { Row, Col, Grid } from "@zendeskgarden/react-grid";
//import { MD } from "@zendeskgarden/react-typography";

export default function Main({ data }) {
  return <AppView data={data} />;
}

function View({ className, data }) {
  const { ticketId, ticketSubject } = data;

  return (
    <div className={className}>

<Row justifyContent="center">
        <Col sm={5}>
          <Field>
            <Label>Test</Label>
              <Textarea minRows={2} maxRows={12} />
          </Field>
        </Col>
</Row>
      <ThemeProvider>
        <Button onClick={() => alert('clicked')}>Send</Button>
        
      </ThemeProvider>
      
      
    </div>

  
  );
}

const AppView = styled(View)`
  #primaryResults {
    flex: 1;
    overflow-y: auto;
  }

  #primaryView {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;
