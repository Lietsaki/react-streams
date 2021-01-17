import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from '../../components/streams/StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    // 1) Fetch the stream to edit and put it in our redux store
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h3>Edit a stream</h3>
        {/* Redux Form's initialValues is a special property name that gives default values to the Fields 
        whose 'name' prop matches any of the properties in the initialValues object. */}
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // 2) Get the stream to edit from our redux store
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
