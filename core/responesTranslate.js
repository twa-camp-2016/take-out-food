class  Respones
{
  constructor(message)
  {
    this._message=message;
  }
  get message()
  {
    return this._message;
  }
  set message(message)
  {
    this._message=message;
  }
}
module.exports=Respones;
