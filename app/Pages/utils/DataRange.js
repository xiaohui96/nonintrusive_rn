import React from 'react';
import Reflux from 'reflux';
import { DatePicker } from 'antd';

class DateRange extends Reflux.Component {

    state = {
        startValue: this.props.startTime,
        endValue: this.props.endTime,
        endOpen: false,
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        //this.props.onChange(this.state.startValue,this.state.endValue);
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
        this.props.onChange(this.state.startValue,this.state.endValue);
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
        this.props.onChange(this.state.startValue,this.state.endValue);
    }

    render() {
        const { startValue, endValue, endOpen } = this.state;
        const {startTime,endTime}=this.props;
        //console.log(startTime,endTime);
        return (
            <span>
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={startValue}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOk={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={endValue}
                    placeholder="End"
                    onChange={this.onEndChange}
                    onOk={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
            </span>
        );
    }
}
export default DateRange;