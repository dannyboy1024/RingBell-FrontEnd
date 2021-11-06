import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/Userinfo.css";

class UserInfo extends Component {
  state = {
    name: '',
    email: '',
    university: '',
    WID: '',
    gender: '',
    matchUni: '',
    topic: '',
    extra_topic: '', 
    faculty: '', 
    need: [], 
    extra_need: '', 
    condition: '', 
    extra_condition: '', 
    availability: '',
    source: [],
    last_match_info: '',
    other_info: ''
  }

  updateInputName = (e) => {
    // console.log(e);
    this.setState({
      name: e.target.value
    });
    
  }

  updateInputUniversity = (e) => {
    // console.log(e);
    this.setState({
      university: e.target.value
    });
  }

  updateInputEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  updateInputWechat = (e) => {
    this.setState({
      WID: e.target.value
    });
  }

  updateInputGender = (e) => {
    this.setState({
      gender: e.target.value
    });
  }

  updateInputMatchUni = (e) => {
    this.setState({
      matchUni: e.target.value
    });
  }

  updateInputExtraTopic = (e) => {
    this.setState({
      extra_topic: e.target.value
    });
  }

  updateInputFaculty = (e) => {
    this.setState({
      faculty: e.target.value
    });
  }

  updateInputNeed = (e) => {
    var needList = this.state.need;
    needList.push(e.target.value);
    this.setState({
      need: needList
    });
  }

  updateInputCondition = (e) => {
    // CheckColors(this.value);
    this.setState({
      condition: e.target.value
    });
  }

  updateInputExtraCondition = (e) => {
    this.setState({
      extra_condition: e.target.value
    });
  }

  updateInputSource = (e) => {
    var sourceList = this.state.source;
    sourceList.push(e.target.value);
    this.setState({
      source: sourceList
    });
  }

  updateInputOtherInfo = (e) => {
    this.setState({
      other_info: e.target.value
    });
  }

  updateInputLastMatchInfo = (e) => {
    this.setState({
      last_match_info: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("before print state");
    // console.log(this.state);
    // windows Session storage
    window.sessionStorage.setItem("bellringer_info",
     JSON.stringify({"email": this.state.email,
      "name": this.state.name})
    );
    // console.log("after print state");

    // redirect to calender
    this.props.history.push('/Calendar');
  }



  render() {
   return (
    <Form onSubmit={this.handleSubmit}>

    <p class="font-weight-bold"> <b>所有信息只用于帮助摇铃人和倾听者更好更快捷地对接，解聆人平台不会在没有用户书面同意的情况下泄露任何私人信息 </b></p>

    <p class="text-danger">注：本平台暂时不适用于有自杀倾向/计划的学生使用。</p>
    <p class="font-weight-bold"> <b>如果你有自杀倾向或者计划，请拨打Good2Talk热线 <a href="tel:1-866-925-5454">+1-866-925-5454</a>，之后可以向接线员要求和Mandarin Speakers 接线。</b></p>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>姓名</b></Form.Label>
          <Form.Control required="true" type="text" value={this.state.name} onChange={this.updateInputName}/>
          <Form.Text className="text-muted">
          此信息将提供给倾听者
          </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>在读学校</b></Form.Label>
          <Form.Control type="text" value={this.state.university} onChange={this.updateInputUniversity}/>
          <Form.Text className="text-muted">
          此信息将提供给倾听者
          </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><b>邮箱</b></Form.Label>
        <Form.Control type="email" value={this.state.email} onChange={this.updateInputEmail}/>
        <Form.Text className="text-muted">
          请确保邮箱信息正确。系统将会通过邮箱向您发送倾听匹配信息
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><b>微信号</b></Form.Label>
        <Form.Control type="text" value={this.state.WID} onChange={this.updateInputWechat}/>
        <Form.Text className="text-muted">
          此信息将提供给倾听者
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><b>性别</b></Form.Label>
        <Form.Select value={this.state.gender} onChange={this.updateInputGender}>
          
        <option value="其他">其他</option>
        <option value="男">男</option>
        <option value="女">女</option>
          
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><b>想要匹配哪所学校的倾听者？</b></Form.Label>
        <Form.Select value={this.state.matchUni} onChange={this.updateInputMatchUni}>

          <option value="多伦多大学 University of Toronto">多伦多大学 University of Toronto</option>
          <option value="西安大略大学 Western University">西安大略大学 Western University</option>
        </Form.Select>
      </Form.Group>

      <p class="text-danger">摇铃人须知</p>
      
      <p class="font-weight-bold">涉及信息及隐私保护规范：</p>
      <ol> 
        <i>
          <li>解聆过程中将不以任何形式留下摇铃人倾诉内容的记录，其中包括但不限于录音、录像、照相、聊天记录。解聆过程中的笔记必须在解聆结束后销毁。</li>
          <li>摇铃人需尊重倾听者个人隐私，不得在解聆结束后向任何第三方转述、透露、或公开发布倾听者在解聆过程中提及的个人信息、隐私、及亲身经历</li>
          <li>摇铃人需尊重倾听者。若摇铃人在解聆过程中出现违反守则的行为（例如：恶意攻击，言语/行动上侮辱倾听者），倾听者有权即刻停止解聆。</li>
          <li>倾听者及解聆人平台所有成员将不以任何方式在任何场合泄露可以识别摇铃人个人身份的信息。</li>
          <li>平台不得以任何形式向第三方转述, 透露, 或公开发布全部或部分上述提及的平台用户个人信息、隐私、以及其亲身经历。</li>
          <li>保密协议例外情况：若摇铃人在解聆过程中讲述内容或涉及（曾经，已有明确计划，或可能危害未成年儿童）的违法行为，倾听者有权向公安机关反馈摇铃人的陈述。</li>
          
        </i>
      </ol>
      
      <p class="font-weight-bold">免责条款</p>
      <p class="font-weight-bold">
       <i>
       <li>平台不对倾听者的行为、言论、及解聆过程中的任何相关延伸领域承担责任。</li>
       <li>解聆结束后，摇铃人与倾听者间解聆关系解除，平台不对倾听者和摇铃人私人间或单方面的协议承担任何形式的责任或义务。</li>
      </i>
      </p>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><b>您是否已经阅读以上摇铃人须知？</b></Form.Label>
        <Form.Label>须知可在解聆人公众平台 “我要摇铃”一栏中找到 请在解聆之前仔细阅读摇铃人须知哦～</Form.Label>
        <Form.Select aria-label="Default select example">
          
          <option value="1">否</option>
          <option value="2">是</option>
          
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><b>您此次想要解聆的方面是？</b></Form.Label>
        <p>每一次解聆请选择一个想focus的话题。如有需要，可以在下一次解聆时勾选其他的话题； 此信息将提供给倾听者</p>
        <Form.Select value={this.state.topic} onChange={this.updateInputTopic}>
          <option value="其它">其它</option>
          <option value="亲情">亲情</option>
          <option value="爱情">爱情</option>
          <option value="友情">友情</option>
          <option value="学业规划">学业规划</option>
          <option value="职业发展">职业发展</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>若以上题目填写“其他”，请在此处说明你的解铃方向，谢谢。</b></Form.Label>
          <Form.Control type="text" value={this.state.extra_topic} onChange={this.updateInputExtraTopic}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>您本科就读的专业是？</b></Form.Label> <br></br>
          <Form.Label>*学业/事业类摇铃请填写此栏，信息将用于协助匹配倾听者。</Form.Label>
          <Form.Control type="text" value={this.state.faculty} onChange={this.updateInputFaculty}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label><b>您此次解聆的主要需求是</b></Form.Label>
        {['checkbox'].map((type) => (
          <div key={`default-${type}`} className="mb-3">
            <Form.Check 
              希望被倾听
              type={type}
              id={1}
              label={"希望被倾听"}
              value={this.state.need} 
              onChange={this.updateInputNeed}
            />

            <Form.Check
              希望和倾听者共同探索解决问题的方法
              type={type}
              label={"希望和倾听者共同探索解决问题的方法"}
              id={2}
              value={this.state.need} 
              onChange={this.updateInputNeed}
            />

            <Form.Check
              其他
              type={type}
              label={"其他"}
              id={3}
              value={this.state.need} 
              onChange={this.updateInputNeed}
            />
          </div>
        ))}
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><b>觉得自己现在的精神状态是？</b></Form.Label>
        <p>此信息将提供给倾听者</p>

        <Form.Select value={this.state.condition} onChange={this.updateInputCondition}>
          <option value="1">状态极佳，想要分享快乐心情</option>
          <option value="2">一切正常，就是有时候懒散提不起劲，有些迷茫和焦虑</option>
          <option value="3">不太好，刚经历了一些挫折，情绪不太稳定</option>
          <option value="4">处于极度抑郁和焦虑状态，觉得自己需要看心理医生</option>
          <option value="5">已经在看心理医生了，想要更好的缓解症状</option>
          <option value="6">最近偶尔有自杀倾向</option>
          <option value="7">其他</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>若以上题目填写“其他”，请在此处说明，谢谢。</b></Form.Label>
          <Form.Control type="text" value={this.state.extra_condition} onChange={this.updateInputExtraCondition}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><b>有想提前说给倾听者的留言吗？</b></Form.Label>
        <p>简单的情况描述将更好的帮助倾听者了解摇铃人现在的情况，以便更好地进行解聆，建议填写。</p>
        <Form.Control as="textarea" rows={3} value={this.state.other_info} onChange={this.updateInputOtherInfo} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>如果您不是首次摇铃，请填写上次摇铃的日期及倾听者姓名（格式：x月x日-倾听者姓名）</b></Form.Label> <br></br>
          <Form.Control type="text" value={this.state.last_match_info} onChange={this.updateInputLastMatchInfo}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label><b>您是通过什么方式了解到解聆人团队或者倾听者项目的呢？</b></Form.Label>
        {['checkbox'].map((type) => (
          <div key={`default-${type}`} className="mb-3">
            <Form.Check 
              微信推文
              type={type}
              id={`default-${type}`}
              label={"微信推文／公众号"}
              value={this.state.source} 
              onChange={this.updateInputSource}
            />

            <Form.Check
              朋友介绍
              type={type}
              label={"朋友介绍"}
              id={`default-${type}`}
              value={this.state.source} 
              onChange={this.updateInputSource}
            />

            <Form.Check
              解聆人线下活动或讲座
              type={type}
              label={"解聆人线下活动或讲座"}
              id={`default-${type}`}
              value={this.state.source} 
              onChange={this.updateInputSource}
            />            

            <Form.Check
              其他
              type={type}
              label={"其他"}
              id={`default-${type}`}
              value={this.state.source} 
              onChange={this.updateInputSource}
            />
          </div>
        ))}
      </Form.Group>

      <br></br>
      <p class="font-weight-bold text-danger"> 
        <b>
          亲爱的摇铃人你好
          表格信息提交后15分钟左右，系统会通过empowerchange.peerlistener@gmail.com向您填写的邮箱发送所匹配倾听者及解聆时间的确认信息。
          倾听者将会在预定的解聆时间开始前～10分钟向您发送倾听信息，以及群聊二维码。
          请一定在解聆前～10分钟检查您的邮箱！！！ 
        </b>
      </p>

      <p>线上倾听将会在微信中进行。</p>


      <Button variant="primary" type="submit" >
        提交
      </Button>
    </Form>
   ); 
  }

}

export default UserInfo;


