import { Avatar, Card, Col, Rate, Typography } from 'antd';

const { Meta } = Card;
const { Text } = Typography;

type Props = {
  avatar: string;
  reviewer: string;
  description: string;
  rate: 1 | 2 | 3 | 4 | 5;
};

export const ReviewCard: React.FC<Props> = ({
  reviewer,
  avatar,
  description,
  rate,
}) => {
  return (
    <Card style={{ width: 300, height: '100%', borderRadius: '20px' }} bordered>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={
          <Col>
            <Text>{reviewer}</Text>
            <br />
            <Rate defaultValue={rate} disabled />
          </Col>
        }
        description={description}
      />
    </Card>
  );
};
