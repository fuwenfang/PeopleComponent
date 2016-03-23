/**
 * Created by fuwenfang on 3/21/16.
 */
var React = require('react');
var ReactDOM = require('react-dom');


var PeopleTitle = React.createClass({
  render:function(){
    return (
      <div className="mbox_filter clearfix">
      <h6>按负责人筛选</h6>
      <div className="mbox_filter_close01"></div>
    </div>
    )
  }
});

var PeopleSearch = React.createClass({
  render:function(){
    return (
        <div className="mbox784_textwrap">
          <textarea id="textarea1" rows="1" className="M01text"></textarea>
        </div>
    )
  }
});

var PeopleLi = React.createClass({
  render:function(){
    return (
        <li>
          <a href="#" target="_blank"><img src={this.props.Avatar} width="60" height="60" /></a>
          <h5>{this.props.name}</h5>
          <div className="zhiwei"><a href="#" target="_blank">{this.props.Dept}</a></div>
        </li>
    )
  }
})

var PeopleList = React.createClass({
  render:function(){
    var LiNode = this.props.peopleData.map(function(peopleData){
            return <PeopleLi Avatar = {peopleData.Avatar} name={peopleData.Name} 
            Dept ={peopleData.Dept} key = {peopleData.ID}></PeopleLi>
        })
    return (
        <div className="mbox_BombBoxList01">
          <ul className="clearfix m_list02">
              {LiNode}
          </ul>
        </div>
    )
  }
});



var PeopleCon = React.createClass({
  render:function(){
    return (
      <div className = "mbox784">
        <PeopleTitle />
        <PeopleSearch/>
        <PeopleList peopleData = {this.props.peopleData}/>
      </div>
    )
  }
});

var PeopleBox = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="mbox_BombBox" >
        <PeopleCon peopleData = {this.state.data}/>
      </div>
    );
  }
});
ReactDOM.render(
  <PeopleBox url = "comments.json"/>,
  document.getElementById('content')
);
