import { z } from 'zod';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form'
import { BadgeValue, InventoryValue } from '@/db/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/products/create-product')({
  component: RouteComponent,
});

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), 'Price must be a number'),
  badge: z.union([
    z.enum(['New', 'Sale', 'Featured', 'Limited']),
    z.undefined(),
  ]),
  rating: z.number().min(0, 'Rating is required'),
  reviews: z.number().min(0, 'Reviews is required'),
  image: z
    .string()
    .url('Image must be a valid URL')
    .max(512, 'Image must be 512 chars or less'),
  inventory: z.enum(['in-stock', 'backorder', 'preorder']),
});

type CreateProductData = {
  name: string
  description: string
  price: string
  image: string
  badge?: 'New' | 'Sale' | 'Featured' | 'Limited'
  inventory: 'in-stock' | 'backorder' | 'preorder'
}


function RouteComponent() {

  const navigate = useNavigate()
  const router = useRouter()
  
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      badge: undefined as BadgeValue | undefined,
      rating: 0,
      reviews: 0,
      image: '',
      inventory: 'in-stock' as InventoryValue,
    },
    validators: {
      onChange: ({ value }) => {
        const result = productSchema.safeParse(value)
        if (!result.success) {
          return result.error.issues.map((issue) => issue.message).join(', ')
        }
        return undefined
      },
    },
    onSubmit: async ({ value }) => {
      // TODO: Implement form submission
    },
  })

  return (
    <div className="mx-auto max-w-7xl py-8 px-4">
      <div className="space-y-6">
        <Card>
          <CardHeader className="gap-2">
            <CardTitle className="text-lg">Create Product</CardTitle>
            <CardDescription className="line-clamp-2">
              Fill in the details to add a new product to the catalog.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('submitting...')
                form.handleSubmit()
              }}
              className="space-y-6"
            >
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Product Name *</Label>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter product name"
                      aria-invalid={!field.state.meta.isValid}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field name="description">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Description</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter product description"
                      aria-invalid={!field.state.meta.isValid}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field name="price">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Price</Label>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      step="0.01"
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="0.0"
                      aria-invalid={!field.state.meta.isValid}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field name="image">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Image URL</Label>
                    <Input
                      type="url"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      step="0.01"
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      aria-invalid={!field.state.meta.isValid}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field name="badge">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Badge (optional)</Label>
                    <Select
                      value={field.state.value ?? ''}
                      onValueChange={(value) =>
                        field.handleChange(
                          value === '' ? undefined : (value as BadgeValue),
                        )
                      }
                    >
                      <SelectTrigger id={field.name} className={'w-full'}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Sale">Sale</SelectItem>
                        <SelectItem value="Featured">Featured</SelectItem>
                        <SelectItem value="Limited">Limited</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field name="inventory">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Inventory Status</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as InventoryValue)
                      }
                    >
                      <SelectTrigger id={field.name} className={'w-full'}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="backorder">Backorder</SelectItem>
                        <SelectItem value="preorder">Preorder</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              {/* form.Subscribe es un componente que te permite suscribirte a cambios específicos del estado del formulario. 
                  Evita que toda la página se recargue cada vez que se actualiza el estado del formulario.
              */}
              <form.Subscribe
                // 1. EL SELECTOR:
                // Aquí le dices: "Solo avísame si cambian 'canSubmit' o 'isSubmitting'"
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {/* 2. EL RENDER PROP:
                Recibes los valores actuales de esas dos variables */}
                {([canSubmit, isSubmitting]) => (
                  <div className="flex gap-4">
                    {/* Se usan las variables para controlar la UI. */}
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? 'Creating...' : 'Create Product'}
                    </Button>
                    <Button
                      type="button"
                      variant={'outline'}
                      onClick={() => navigate({ to: '/products' })}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form.Subscribe>
              </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
