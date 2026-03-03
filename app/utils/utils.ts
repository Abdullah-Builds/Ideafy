export default function format_date(date:any){

    return new Date ().toLocaleDateString( 'en-US', {
      year : 'numeric',
      month : 'long',
      day : 'numeric',
    })
}

export function parseServerActionResponse<T>(response : T){
  return JSON.parse(JSON.stringify(response))
}