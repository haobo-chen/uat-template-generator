import "./styles.css";
import { Form, Input, Button, Select } from "antd";
import { useCallback, useState } from "react";

const { Option } = Select;

export default function App() {
  const [templateUrl, setTemplateUrl] = useState("");
  const [dashboardUrl, setDashboardUrl] = useState("");

  const buildUrl = useCallback((values: any) => {
    const newTemplateUrl = new URL(
      "https://jira.sc-corp.net/secure/CreateIssueDetails!init.jspa?pid=12117&issuetype=10200&customfield_11221=10743&customfield_11801=11608&customfield_11800=11604&customfield_11000=10500&versions=13237&priority=10101&assignee=-1&customfield_11001=48929&description=Steps%20to%20Reproduce%3A%0A%23%20Navigate%20to%0A%0AExpected%20Behavior%3A%0AObserved%20Behavior%3A"
    );

    newTemplateUrl.searchParams.append("labels", values.featureLabel);
    newTemplateUrl.searchParams.append("labels", values.podLabel);
    newTemplateUrl.searchParams.append("components", values.component);
    newTemplateUrl.searchParams.append("labels", "UAT");
    newTemplateUrl.searchParams.append("security", "13801");
    newTemplateUrl.searchParams.append("customfield_11700", "57106");

    setTemplateUrl(newTemplateUrl.href);

    const newDashboardUrl = new URL(
      `https://jira.sc-corp.net/issues/?jql=labels%20in%20(${values.featureLabel})`
    );
    setDashboardUrl(newDashboardUrl.href);
  }, []);

  return (
    <div className="App">
      <h1>UAT Bug Template Generator</h1>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800, margin: "auto" }}
        autoComplete="off"
        onFinish={buildUrl}
      >
        <Form.Item
          label="Component"
          name="component"
          rules={[{ required: true, message: "Please input your component!" }]}
          style={{ textAlign: "start" }}
        >
          <Select>
            <Option value="11404">Ads Manager</Option>
            <Option value="11408">Business Manager</Option>
            <Option value="37603">Profile Manager</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Feature Label"
          name="featureLabel"
          rules={[
            { required: true, message: "Please input your feature's label!" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Pod Label"
          name="podLabel"
          rules={[
            { required: true, message: "Please input your pod's label!" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item
          label="Template Url"
          name="templateUrl"
          style={{ maxWidth: 800, overflowWrap: "anywhere" }}
        >
          {templateUrl}
        </Form.Item>
        <Form.Item
          label="Dashboard Url"
          name="dashboardUrl"
          style={{ maxWidth: 800, overflowWrap: "anywhere" }}
        >
          {dashboardUrl}
        </Form.Item>
      </Form>
    </div>
  );
}
