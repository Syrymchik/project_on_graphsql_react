import React, {Component, Fragment} from 'react'
import PropTypes from "prop-types";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";


const style = {
    comment: {
        marginTop: '30px',
        background: 'inherit',
        color: 'inherit',
    },
    repliesStyle: {
        marginTop: '5px',
        background: 'grey',
        marginLeft: '50px',
    }

};

export class Comment extends Component {
    state = {
    };

    static propTypes = {
        comment: PropTypes.object,
    };

    static defaultProps = {
        comment: {},
    };

    componentDidMount(): void {}
    componentWillUnmount(): void {}

    render() {
        const { body, replies } = this.props.comment;

        return (
            <Fragment>
                <SnackbarContent message={body}
                                 style={style.comment}
                />
                {
                    replies.map((obj, index) => (
                            <SnackbarContent key={index} style={style.repliesStyle}
                                             message={obj.body}/>
                    ))}
            </Fragment>
        )
    }
}

class Comments extends Component {

    state = {

    };

    static propTypes = {
        comments: PropTypes.array,
    };

    static defaultProps = {
        comments: [],
    };

    componentDidMount(): void {}
    componentWillUnmount(): void {}

    render () {
        const { comments = []} = this.props;
        if (comments.length <=0 ) {
            return <SnackbarContent message={'No Comment'} style={style.comment}  />
        }
        return (
            <Fragment>
                {
                    comments.map((comment, index) => (
                        <Comment key={ index } comment={comment}/>
                    ))
                }
            </Fragment>
        )
    }
}

export default Comments;