<script setup>
import { onMounted, ref, watch } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useCouponStore } from "@/stores/coupon";
import Tag from "primevue/tag";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { convertMoney, formatDate } from "../../utils";
import { Status } from "@/utils/typeAction";

const useCoupon = useCouponStore();

const visible = ref(false);

const selectedType = ref();
const types = ref([
  { name: "Reduce invoice percentage", code: "PERCENTAGE_OF_INVOICES" },
  { name: "Reduce bills", code: "MONEY" },
]);

const dates = ref();

const dataCreateCoupon = ref({
  couponName: "",
  description: "",
  totalInvoice: 0,
  reducedValue: 0,
  typeCoupon: "",
  startDate: 0,
  endDate: 0,
});

onMounted(() => {
  useCoupon.getListCouponAction();
});

watch(visible, (value) => {
  if (!value) {
    dataCreateCoupon.value = {
      couponName: "",
      description: "",
      totalInvoice: 0,
      reducedValue: 0,
      typeCoupon: "",
      startDate: 0,
      endDate: 0,
    };
    selectedType.value = null;
    dates.value = null;
  }
});

const handleCreateCoupon = async () => {
  dataCreateCoupon.value.typeCoupon = selectedType.value.code;
  dataCreateCoupon.value.startDate = new Date(dates.value[0]).getTime();
  dataCreateCoupon.value.endDate = new Date(dates.value[1]).getTime();
  const res = await useCoupon.createCouponAction(dataCreateCoupon.value);
  if (res) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: res.message,
      showConfirmButton: false,
      timer: 1500,
    });
    visible.value = false;
  } else {
    Swal.fire({
      title: "Error!",
      text: "Error!",
      icon: "error",
    });
  }
};

const handleChangeStatus = (couponId, type) => {};
</script>

<template>
  <div>
    <div class="coupon-main">
      <h3>Coupon Manager</h3>
      <div>
        <Button
          @click="visible = true"
          label="Add Coupon"
          severity="success"
          raised
        />
      </div>
      <div class="mt-3">
        <DataTable :value="useCoupon.listCoupon" tableStyle="min-width: 50rem">
          <Column field="index" header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column header="Action">
            <template #body="slotProps">
              <div>
                <Button
                  v-if="slotProps.data.status === Status.WRITE"
                  icon="pi pi-play"
                  severity="success"
                  text
                  rounded
                  aria-label="Search"
                />
                <Button
                  v-if="slotProps.data.status === Status.ACTIVATED"
                  icon="pi pi-pause"
                  severity="warning"
                  text
                  rounded
                  aria-label="Search"
                />
                <Button
                  v-if="slotProps.data.status === Status.ACTIVATED"
                  icon="pi pi-stop"
                  severity="danger"
                  text
                  rounded
                  aria-label="Search"
                />
                <Button
                  v-if="slotProps.data.status === Status.WRITE"
                  icon="pi pi-pencil"
                  severity="help"
                  text
                  rounded
                  aria-label="Search"
                />
                <Button icon="pi pi-eye" text rounded aria-label="Search" />
              </div>
            </template>
          </Column>
          <Column field="couponId" header="Id"></Column>
          <Column field="couponName" header="Name"></Column>
          <Column field="status" header="Status">
            <template #body="slotProps">
              <Tag
                :severity="
                  slotProps.data.status === Status.WRITE
                    ? 'warning'
                    : slotProps.data.status === Status.STOP
                    ? 'danger'
                    : slotProps.data.status === Status.PAUSE
                    ? 'info'
                    : 'success'
                "
                :value="slotProps.data.status"
              ></Tag>
            </template>
          </Column>
          <Column field="typeCoupon" header="Type"></Column>
          <Column field="totalInvoice" header="Invoice">
            <template #body="slotProps">
              {{ convertMoney(slotProps.data.totalInvoice) }}
            </template>
          </Column>
          <Column field="reducedValue" header="Reduced">
            <template #body="slotProps">
              {{
                convertMoney(slotProps.data.reducedValue) +
                (slotProps.data.typeCoupon === "MONEY" ? "$" : "%")
              }}
            </template>
          </Column>
          <Column field="startDate" header="Start Date">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.startDate) }}
            </template>
          </Column>
          <Column field="endDate" header="End Date">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.endDate) }}
            </template>
          </Column>
          <Column field="createDate" header="Create Date">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createDate) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Add Coupon"
      :style="{ width: '60vw' }"
    >
      <div class="coupon-modal">
        <div class="flex flex-column gap-2">
          <label for="username">Coupon Name</label>
          <InputText
            id="username"
            v-model="dataCreateCoupon.couponName"
            aria-describedby="username-help"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Coupon type</label>
          <Dropdown
            id="username"
            v-model="selectedType"
            :options="types"
            optionLabel="name"
            placeholder="Select coupon type"
            class="w-full"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Invoice</label>
          <InputNumber
            :disabled="!selectedType"
            id="username"
            v-model="dataCreateCoupon.totalInvoice"
            aria-describedby="username-help"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Reduced value</label>
          <span class="p-input-icon-right">
            <i
              class="pi"
              :class="
                !selectedType
                  ? ''
                  : selectedType?.code === 'PERCENTAGE_OF_INVOICES'
                  ? 'pi-percentage'
                  : 'pi-dollar'
              "
            />
            <InputNumber
              :disabled="!selectedType"
              class="w-full"
              id="username"
              v-model="dataCreateCoupon.reducedValue"
              aria-describedby="username-help"
            />
          </span>
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Time application</label>
          <Calendar
            placeholder="Time"
            id="username"
            v-model="dates"
            selectionMode="range"
            :manualInput="false"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Description</label>
          <Textarea
            class="w-full"
            auto-resize
            rows="5"
            v-model="dataCreateCoupon.description"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="visible = false"
          text
        />
        <Button
          label="Save"
          severity="success"
          icon="pi pi-check"
          @click="handleCreateCoupon"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.coupon-main {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
}

.coupon-modal {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
