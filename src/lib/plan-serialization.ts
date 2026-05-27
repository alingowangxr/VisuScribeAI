import { BodySpec, CoverSpec, ImagePlan } from './types'

function shouldPersistGeneratedUrl(url: string | undefined): url is string {
  return Boolean(url && !url.startsWith('data:'))
}

function stripLargeGeneratedUrl<T extends CoverSpec | BodySpec>(spec: T): T {
  if (shouldPersistGeneratedUrl(spec.generatedUrl)) {
    return spec
  }

  return { ...spec, generatedUrl: undefined }
}

export function stripLargeGeneratedImages(
  plan: ImagePlan | null
): ImagePlan | null {
  if (!plan) return null

  return {
    cover: stripLargeGeneratedUrl(plan.cover),
    bodies: plan.bodies.map(stripLargeGeneratedUrl),
  }
}
