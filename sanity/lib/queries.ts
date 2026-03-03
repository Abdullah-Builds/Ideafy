export const STARTUPS_QUERY = `
*[_type == "startup" && defined(slug.current) && (
    !defined($search) || $search == null || $search == "" ||
    category match $search ||
    author->name match $search ||
    title match $search
)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author->{_id, name, image, bio},
  views,
  description,
  category,
  image
}
`;

export const STARTUP_BY_QUERY_BY_ID = `
*[_type=="startup" && _id==$id][0]{
  _id,title,slug,_createdAt,
    author->{_id,name,username,email,image,bio},
    views,description,category,image,pitch
}`;

export const STARTUP_VIEWS = `
*[_type=="startup" && _id==$id]{
views
}
 `;


export const AUTHOR_BY_GITHUB_ID = `
*[_type=="author" && _id == $id][0]{
   id,
   _id,
   image,
   name,
   username,
   email,
   bio
}
  `