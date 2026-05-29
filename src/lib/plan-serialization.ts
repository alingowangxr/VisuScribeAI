import { BodySpec, CoverSpec, ImagePlan } from './types'

function shouldPersistGeneratedUrl(url: string | undefined): url is string {
  return Boolean(url && !url.startsWith('data:') && !url.startsWith('blob:'))
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
    cover: plan.cover ? stripLargeGeneratedUrl(plan.cover) : undefined as unknown as CoverSpec,
    bodies: Array.isArray(plan.bodies) ? plan.bodies.map(stripLargeGeneratedUrl) : [],
  }
}
