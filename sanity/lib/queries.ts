import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`

export const countriesQuery = groq`*[_type == "country"] | order(order asc) {
  _id, name, "slug": slug.current, flag, tagline, universityCount, order
}`

export const countryBySlugQuery = groq`*[_type == "country" && slug.current == $slug][0] {
  _id, name, "slug": slug.current, flag, tagline, universityCount,
  overview, whyStudyHere, topUniversities, intakes, averageCost, visaInfo
}`

export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id, title, serviceId, icon, shortDesc, longDesc, features, order
}`

export const blogsQuery = groq`*[_type == "blog"] | order(publishedDate desc) {
  _id, title, "slug": slug.current, category, readingTime, publishedDate, featured,
  heroImage, "authorName": author->name
}`

export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, category, readingTime, publishedDate,
  heroImage, body, "author": author->{name, role, photo}
}`

export const successStoriesQuery = groq`*[_type == "successStory"] | order(year desc) {
  _id, name, university, "countryName": coalesce(country->name, countryName),
  course, scholarship, year, quote, photo, featured
}`

export const teamMembersQuery = groq`*[_type == "teamMember"] | order(order asc) {
  _id, name, role, experience, specialisation, countries, bio, photo, linkedin, order
}`

export const eventsQuery = groq`*[_type == "event"] | order(date desc) {
  _id, title, date, mode, city, spots, description, registrationUrl, featured
}`

export const universitiesQuery = groq`*[_type == "university"] {
  _id, name, "countryName": coalesce(country->name, countryName),
  ranking, type, city, website, logo
}`

export const faqsQuery = groq`*[_type == "faq"] | order(order asc) {
  _id, question, answer, order
}`

export const resourcesQuery = groq`*[_type == "resource"] | order(order asc) {
  _id, title, description, type, "fileUrl": file.asset->url, externalUrl, order
}`

export const stepsQuery = groq`*[_type == "step"] | order(order asc) {
  _id, title, shortDesc, longDesc, order
}`

export const storiesByCountryQuery = groq`*[_type == "successStory" && country->slug.current == $slug] | order(year desc) {
  _id, name, university, "countryName": coalesce(country->name, countryName),
  course, scholarship, year, quote
}`
